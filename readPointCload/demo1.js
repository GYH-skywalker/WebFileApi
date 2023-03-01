
export default {
    getPoints(){
        const url = 'points.bin';

        fetch(url)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                console.log(buffer);
                const data = new DataView(buffer);
                console.log(data);
                const numPoints = data.byteLength;
                console.log(numPoints);
                const points = [];
                // const y = data.getFloat64(1974352 * 12 +4, true);
                // console.log(y);
                for (let i = 0; i < numPoints / 12 - 1; i++) {
                    const offset = 4 + i * 12;
                    const x = data.getFloat32(offset, true);
                    const y = data.getFloat32(offset + 4, true);
                    const z = data.getFloat32(offset + 8, true);
                    points.push([x,y,z]);
                }
                console.log(points);
                // Use the points array to create a point cloud
            })
            .catch(error => console.error(error));

    }
}