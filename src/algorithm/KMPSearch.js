const LevenDist = require('./LevenDist');

class KMPSearch extends LevenDist {
    constructor(pattern) {
        super(pattern);

        // implementasi fungsi compute border
        this.fail = new Array(pattern.length + 1);
        this.fail[0] = -1;  
        this.fail[1] = 0;

        let i = 1;
        let j = 0;

        while (i < pattern.length) {
            if (pattern[j] == pattern[i]) {
                j++;
                i++;
                this.fail[i] = j;
            }
            else if (j > 0) {
                j = this.fail[j];
            }
            else {
                i++;
                this.fail[i] = 0;
            }
        }
    }

    KMPMatch(text) {
        // fungsi untuk string matching menggunakan algoritma KMP
        let textLength = text.length;
        let patternLength = this.pattern.length;

        if (patternLength >= textLength) {
            return false;
        }

        let i = 0;  // text pointer
        let j = 0;  // pattern pointer
        let pattern = this.pattern;

        while (i < textLength) {
            const currentMatch = pattern[j] === text[i];
            if (currentMatch) {
                j++;
                i++;
                const correctPattern = j == patternLength
                if (correctPattern) {
                    return true;
                }
            }
            else {
                j = this.fail[j];
                if (j < 0) {
                    i++;
                    j++;
                }
            }
        }
        return false;
    }
}