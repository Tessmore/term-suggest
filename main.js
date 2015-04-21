'use strict';

var termSuggest = {
    "threshold" : 3,

      // Return N closest suggestions, defaults to 1 element
    "closest" : function(str, terms, N) {
        if (typeof str === 'undefined') return null;
        if (typeof terms === 'undefined') return null;
        if (typeof N === "undefined") N = 1;

        var distance = this.distance;

        var tmp = terms.sort(function(a, b) {
            var distA = distance(str, a);
            var distB = distance(str, b);

            return distA - distB;
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

    // Levensthein
    // http://stackoverflow.com/a/18514751/951517
    "distance" : function(s1, s2) {
        var row2 = [];

        var s1_len = s1.length, s2_len = s2.length;

        if (s1_len && s2_len) {
          var i1 = 0, i2 = 0, a, b, c, c2, row = row2;

          while (i1 < s1_len)
            row[i1] = ++i1;

          while (i2 < s2_len) {
            c2 = s2.charCodeAt(i2);
            a = i2;
            ++i2;
            b = i2;
            for (i1 = 0; i1 < s1_len; ++i1) {
              c = a + (s1.charCodeAt(i1) !== c2 ? 1 : 0);
              a = row[i1];
              b = b < a ? (b < c ? b + 1 : c) : (a < c ? a + 1 : c);
              row[i1] = b;
            }
          }

          return b;
        }
        else {
          return s1_len + s2_len;
        }
    }
};

if (typeof module !== "undefined" && typeof exports !== "undefined") {
    module.exports = termSuggest;
}
