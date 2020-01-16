import request from '@/utils/request';

export async function queryTags() {
  return request('/api/tags');
}


const storeData = (payload) => {
  console.log(payload,"oo")
  localStorage.setItem(1,payload)

  for(var i=0; i<localStorage.length;i++){          
      console.log('第'+i+'条数据key为：'+localStorage.key(i)+',value为：'+localStorage.getItem(localStorage.key(i)));      
   }
}
export default storeData;