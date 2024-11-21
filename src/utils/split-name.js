export default function splitName(name) {
    if (!name) return '';
    const splited = name.split(' ');
    let splitedName = '';
    for (let i = 0; i < splited.length; i++) {
        splitedName += splited[i][0].toUpperCase();
    }
    return splitedName;
}