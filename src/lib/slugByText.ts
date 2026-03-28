export const slugByText = (value:string | undefined) => {
    if(!value) return "";

    // 1. Quitar espacios inicio y final
    let texto = value.trim();

    // 2. Quitar tildes
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 3. Eliminar todo excepto letras, números, espacios y guiones
    texto = texto.replace(/[^a-zA-Z0-9\s-]/g, "");

    // 4. Reemplazar espacios por guion
    texto = texto.replace(/\s+/g, "-");

    // 5. Eliminar números al inicio
    texto = texto.replace(/^[0-9-]+/, "");

    return texto;
}