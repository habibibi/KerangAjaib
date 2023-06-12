function getLevenDist(s1, s2){
    // fungsi untuk mengembalikan jarak levenshtein distance, 
    // yaitu jumlah minimum operasi yang diperlukan untuk mengubah string s1 menjadi s2
    // semakin besar nilainya, maka semakin berbeda stringnya
    const dpArr = new Array(s1.length + 1).fill(0).map(() => new Array(s2.length + 1).fill(0));
    for (let i = 1; i <= s1.length; i++) {
        dpArr[i][0] = i;
    }
    for (let j = 1; j <= s2.length; j++) {
        dpArr[0][j] = j;
    }

    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++){
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dpArr[i][j] = Math.min(
                dpArr[i - 1][j] + 1,
                dpArr[i][j - 1] + 1,
                dpArr[i - 1][j - 1] + cost
            );
        }
    }
    return dpArr[s1.length][s2.length];
}

module.exports = getLevenDist;
