import {useEffect,useState} from 'react'
function Page(table,currentPage) {
    const [data,setData] = useState([]); 
/* ================================== PAGE ================================== */
useEffect(() => {
    let newsPerPage = 10;
   //(vị trí)  cuối của trang  vd : 10 = 1 * 10 , 20 = 2 * 10
   const indexLast = currentPage * newsPerPage;
   //(vị trí) đầu của trang 0 = 10 - 10 , 10 = 20 -10 
   const indexHead = indexLast - newsPerPage; 
   //*cắt* dữ liệu ban đầu, lấy ra 1 mảng dữ liệu mới cho trang hiện tại
   const datas = table.slice(indexHead, indexLast); 
   setData(datas)
}, [table,currentPage]);
/* ================================== PAGE ================================== */
    return data;
}
export default Page;