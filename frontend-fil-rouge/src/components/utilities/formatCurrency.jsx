export function formatCurrency(amount) {
    if (!amount) return '0 FCFA';
    
    // Convertir en string et enlever les décimales si présentes
    const number = Math.floor(Number(amount)).toString();
    
    // Ajouter les séparateurs de milliers
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    
    return `${formattedNumber} FCFA`;
}