/***************************************************************************
 * Do What THe Fuck You Want To Public Licence 2                           *
 *                                                                         *
 * JavaScript implementation by Piotr Rochala (http://rocha.la/)           *
 * Based on C# work of Serge Meunier (http://www.smokycogs.com/)           *
 *                                                                         *
 * Check this code in action on http://rocha.la/javascript-plasma-fractal  *
 *                                                                         *
 **************************************************************************/

//plasma.js
var $plasma = function(){
    var roughness, totalSize;
    var p1, p2, p3, p4;
    var width, height, canvas, ctx, points, plasmaType, colorModif;
    var types = { PLASMA: 0, CLOUD: 1 };

    this.init = function(canvasId, w, h, rough, type, r, g, b){
        //initialize local variables
        width = w;
        height = h;
        roughness = rough;
        plasmaType = type;
        colorModif = [r, g, b];
        canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
        totalSize = width + height;
        ctx = canvas.getContext("2d");
        //give corners random colors
        p1 = Math.random();
        p2 = Math.random();
        p3 = Math.random();
        p4 = Math.random();
    };

    this.draw = function(rough, r, g, b){
        this.generatePoints();
        if(rough != undefined) roughness = rough;
        if(r != undefined) colorModif[0] = r;
        if(g != undefined) colorModif[1] = g;
        if(b != undefined) colorModif[2] = b;
        for (var x = 0; x < width; x++){
            for (var y = 0; y < height; y++){
                var color = this.getColor(points[x][y], plasmaType);
                //ctx.fillStyle = "rgba("+color.r+","+color.g+","+color.b+","+Math.random()+")";
                ctx.fillStyle = "rgb("+color.r+","+color.g+","+color.b+")";
                ctx.fillRect(x, y, 1, 1);
            }
        }
    };

    this.generatePoints = function(){
        points = [];
        for (var x = 0; x < width; x++){
            points[x] = [];
        }
        this.splitRect(points, 0, 0, width, height, p1, p2, p3, p4);
    };

    this.splitRect = function(points, x, y, width, height, p1, p2, p3, p4){
        var side1, side2, side3, side4, center;
        var transWidth = ~~(width / 2);
        var transHeight = ~~(height / 2);

        //as long as square is bigger then a pixel..
        if (width > 1 || height > 1){
            //center is just an average of all 4 corners
            center = ((p1 + p2 + p3 + p4) / 4);

            //randomly shift the middle point
            center += this.shift(transWidth + transHeight);

            //sides are averages of the connected corners
            //p1----p2
            //|     |
            //p4----p3
            side1 = ((p1 + p2) / 2);
            side2 = ((p2 + p3) / 2);
            side3 = ((p3 + p4) / 2);
            side4 = ((p4 + p1) / 2);

            //its possible that middle point was moved out of bounds so correct it here
            center = this.normalize(center);
            side1 = this.normalize(side1);
            side2 = this.normalize(side2);
            side3 = this.normalize(side3);
            side4 = this.normalize(side4);

            //repeat operation for each of 4 new squares created
            //recursion, baby!
            this.splitRect(points, x, y, transWidth, transHeight, p1, side1, center, side4);
            this.splitRect(points, x + transWidth, y, width - transWidth, transHeight, side1, p2, side2, center);
            this.splitRect(points, x + transWidth, y + transHeight, width - transWidth, height - transHeight, center, side2, p3, side3);
            this.splitRect(points, x, y + transHeight, transWidth, height - transHeight, side4, center, side3, p4);
        } else {
            //when last square is just a pixel, simply average it from the corners
            points[x][y]= (p1 + p2 + p3 + p4) / 4;
        }
    };

    this.normalize = function(val){
        return (val < 0) ? 0 : (val > 1) ? 1 : val;
    };

    this.shift = function(smallSize){
        //var middlepoint = (Math.random() - 0.5) * smallSize / totalSize * roughness;
        var middlepoint = ((Math.E * Math.PI * Math.random() / 10) - Math.random()) * smallSize / totalSize * roughness;
        return middlepoint;
    };

    this.getColor = function(c, type){
        var red = 0, green = 0, blue = 0;
        switch (type){
            case types.CLOUD:
                if (c < 0.3) red = c;
                red = green = c;
                blue = 1;
                break;
            case types.PLASMA:
                //r
                if (c < 0.5) red = c * 2;
                else red = (1.0 - c) * 2;
                //g
                if (c >= 0.3 && c < 0.8) green = (c - 0.3) * 2;
                else if (c < 0.3) green = (0.3 - c) * 2;
                else green = (1.3 - c) * 2;
                //b
                if (c >= 0.5) blue = (c - 0.5) * 2;
                else blue = (0.5 - c) * 2;
                break;
            default:
                red = green = blue = c;
                break;
        }
        return {
            r: ~~(red * colorModif[0]),
            g: ~~(green * colorModif[1]),
            b: ~~(blue * colorModif[2])
        };
    };

    return this;
};