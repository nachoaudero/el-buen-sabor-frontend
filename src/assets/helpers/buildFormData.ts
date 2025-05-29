import type {RequestDTO} from "@dtos/BaseDtos.ts";

export function buildFormData<T extends RequestDTO>(
    data: T,
    formData: FormData = new FormData(),
    parentKey: string | null = null
): FormData {
    if (data === null || data === undefined) return formData;

    for (const [key, value] of Object.entries(data)) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (value instanceof File) {
            formData.append(fullKey, value);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                buildFormData(item, formData, `${fullKey}[${index}]`);
            });
        } else if (typeof value === "object" && value !== null) {
            buildFormData(value, formData, fullKey);
        } else if (value !== undefined && value !== null) {
            formData.append(fullKey, value.toString());
        }
    }

    return formData;
}