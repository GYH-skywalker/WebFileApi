export default {

    Points:[],
    getProjectFile(path){

        fetch(path).then(res=>{
            if(!res.ok) throw new Error('fail to load file');
            console.log(res);
            return res.blob()
        }).then(res=>{
            let reader = new FileReader()
            reader.readAsArrayBuffer(res)
            reader.onload = ev=>{
                console.log(ev.target.result);
                let dataView = new DataView(ev.target.result)
                let pointsNum = dataView.getInt32(0,true)
                console.log(pointsNum);
                for (let i = 0; i < pointsNum; i++) {
                    let x = dataView.getFloat32(i * 12 +4,true)
                    let y = dataView.getFloat32(i * 12 +8,true)
                    let z = dataView.getFloat32(i * 12 +12,true)
                    this.Points.push([x,y,z])
                }
                const options = {depth:8,fullscreen:false}
                console.log(this.Points);
            }
        }).catch(err=>{
            console.error(err);
        })
    }
}