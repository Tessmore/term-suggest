'use strict';

module.exports = {
    "threshold" : 3,

      // Return N closest suggestions, defaults to 1 element
    "closest" : function(str, terms, N) {
        if (typeof str === 'undefined') return null;
        if (typeof terms === 'undefined') return null;
        if (typeof N === "undefined") N = 1;

        var distance = this.distance;

        var tmp = terms.sort(function(a, b) {
            return distance(str, a) - distance(str, b);
        });

        return N === 1 ? tmp[0] : tmp.slice(0, N);
    },

    "distances" : function(str, terms, threshold) {
        if (typeof str === 'undefined') return null;
        if (typeof terms === 'undefined') return null;
        if (typeof threshold === "undefined") threshold = this.threshold;

        var result = {};

        for (var i=0, N=terms.length; i<N; i++) {
            var dist = this.distance(str, terms[i]);

            if (dist < threshold)
              result[terms[i]] = dist;
        }

        return result;
    },

    "distance" : function(s1, s2) {
        // Levensthein
        // http://stackoverflow.com/a/18514751/951517
        var s1_len = s1.length;
        var s2_len = s2.length;

        if (s1_len && s2_len) {
            var a, b, c, c2, row = new Array(s1_len);

            for (var i=0; i < s1_len; i++) {
                row[i] = i;
            }

            for (var j=0, a=j, b=j+1; j < s2_len; j++) {
                c2 = s2.charCodeAt(j);

                for (i=0; i < s1_len; i++) {
                    c = a + (s1.charCodeAt(i) === c2 ? 0 : 1);
                    a = row[i];
                    b = b < a ? (b < c ? b + 1 : c) : (a < c ? a + 1 : c);

                    row[i] = b;
                }
            }

            return b;
        }
        else {
            return s1_len + s2_len;
        }
    }
};
