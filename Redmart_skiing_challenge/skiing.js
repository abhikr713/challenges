/**
 * Problem Statement: http://geeks.redmart.com/2015/01/07/skiing-in-singapore-a-coding-diversion/
 */

const fs = require('fs');

fs.readFile('map', 'utf-8', (e, data) => {
    main(data.trim().split('\n').map(line => line.split(' ').map(v => parseInt(v))));
});

function main(dataLines) {
    /**Initialization */

    const N = dataLines[0][0], M = dataLines[0][1];
    const mat = dataLines.slice(1);
    const visited = Array(N).fill(Array(M).fill(false));
    const flatMat = [];
    let maxPath = [];
    let resultPathProps = {
        pathLength: 0,
        dropHeight: 0
    };
    mat.forEach((r, i) => r.forEach((v, j) => flatMat.push({i,j,v})));
    flatMat.sort((a, b) => b.v - a.v);

    /**Find paths */
    flatMat.forEach(valObj => {
        if(!visited[valObj.i][valObj.j] && valObj.v > resultPathProps.dropHeight) {
            const res = findPathFrom(mat, [{i: valObj.i, j :valObj.j}]);
            maxPath = findMaxPath(maxPath, res, mat);
            resultPathProps = calcPathLengthAndHeight(maxPath, mat);
            res.forEach(pos => visited[pos.i][pos.j] = true);
        }
    });

    console.log(`${resultPathProps.pathLength}${resultPathProps.dropHeight}@redmart.com`);
}

function findPathFrom(mat, path) {
    const i = path[path.length-1].i, j = path[path.length-1].j;
    let maxPath = path.slice();
    const origPath = path.slice();
    const possibilities = [{r: i, c :j-1}, {r: i, c :j+1},{r: i-1, c :j},{r: i+1, c :j}];

    possibilities.filter(pos => pos.r >= 0 && pos.r < mat.length && 
        pos.c >= 0 && pos.c < mat[mat.length-1].length &&
        mat[pos.r][pos.c] < mat[i][j]).forEach(pos => {

        path = origPath.slice();
        path.push({i: pos.r, j: pos.c});
        maxPath = findMaxPath(maxPath, findPathFrom(mat, path), mat);
        
    });
    return maxPath;
}

function findMaxPath(max, res, mat) {
    const maxProps = calcPathLengthAndHeight(max, mat);
    const resProps = calcPathLengthAndHeight(res, mat);
    if(maxProps.pathLength < resProps.pathLength || (maxProps.pathLength === resProps.pathLength && maxProps.dropHeight < resProps.dropHeight)) {
        return res;
    }
    return max;
}

function calcPathLengthAndHeight(path, mat) {
    return {
        pathLength: path.length,
        dropHeight: path.length === 0 ? 0 : mat[path[0].i][path[0].j] - mat[path[path.length-1].i][path[path.length-1].j]
    };
}