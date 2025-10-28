// Funciones reutilizables

// Normaliza el texto y sirve principalmente para una busqueda mas agil
function normalizeText(text = '') {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

module.exports = { normalizeText };