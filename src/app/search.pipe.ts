import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allEmployee: any[], searchKey: string): any[] {
   const  result:any=[]
   if(!allEmployee || searchKey==""){
    return allEmployee
   }
   else{
    allEmployee.forEach((item)=>{
      if(item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })
   }
   return result
  }

}
