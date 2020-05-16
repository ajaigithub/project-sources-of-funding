<template>
  <v-app id="app">
  <v-container>
  <h1>Expected sources of funding</h1>
             <v-card>
               <v-card-row>                                      
                <v-data-table 
                v-model="items"
                :headers="headers"
                :items="items">  
     
  <template #item.name>
        <td class="text-left" style="font-weight:bold">{{itemname}}  </td>
  </template>

  <template #item.amnt>
        <td class="text-left" style="font-weight:bold"><input type="text" :disabled="!isEditing" v-model="itemamount"></td>
  </template>
              
  <template #item.percnt>
       <td align="left" style="font-weight:bold">{{sospercnt}}%</td>
  </template>
  <template #item.data>
        <v-icon small @click="isEditing = !isEditing" v-if="!isEditing" right>edit</v-icon>
        <v-icon small @click="save" v-else-if="isEditing" right>save</v-icon>  
  </template>
 <template class="grey" #body.append="{headers}">
      <tr class="head"  :colspan="headers.length" align="justify">
      <td  style="font-weight:bold"> Other contributions </td>
      <td style="font-weight:bold">  </td>
      <td>  </td>
      <td>  </td>
      <td>  </td>
      </tr>
   <tr class="headr " align="left">
     <td> Name of Donor </td>
     <td> Description </td>
     <td> Amount(€) </td>
     <td> Percentage </td>
<v-tooltip bottom>
<template #activator="{ on }">
<v-icon size="25" id="add" @click="addnew" v-on="on">add</v-icon>
</template>
<span>add</span>
</v-tooltip>
   </tr>
   <tr align="left" v-for="row in rows" :key="row">
      <td><input type="text" :disabled="!isEditing" v-model="row.name"></td>
       <td><input type="text" :disabled="!isEditing" v-model="row.description"></td> 
      <td ><input type="text" :disabled="!isEditing" v-model="row.amount"></td>
       <td><input :disabled="!isEditing" type="text" v-model="row.percent"></td>
        <v-icon align="right" small @click="isEditing = !isEditing" v-if="!isEditing" right>edit</v-icon>
        <v-icon align="right" small @click="save" v-else-if="isEditing" right>save</v-icon>
      
       <v-icon small @click="deleteitem(row)">
          mdi-delete
       </v-icon>
     <tr align="left" :colspan="headers.length">
     <td>Subtotal</td> 
     <td></td> <td ><input type="text" :disabled="!isEditing" v-model="sum"></td>
     <td>{{subtpercent}}%</td> 
     </tr>
<tr align="left" :colspan="headers.length">

<td style="font-weight:bold"> Expected contributions</td>
<td> </td>
<td style="font-weight:bold">{{total}}</td>
<td></td>
</tr>
 </template>
 </v-data-table>
 </v-card-row>
 </v-card> 
 </v-container>
 </v-app>
 </template>
    
<script>
import http from "../http-common";
export default{
 el:"#app",
 
    data(){
        return{
           
          isEditing: false,
          rows:{name:'',description:'',amount:0,percent:''},
          itemname:"SOS contributions",
          itemamount:25000,
               headers:[
                {text:"",align:"start",value:"name"},
                {text:"",value:"part"},
                {text:"Amount(€)",value:"amnt"},
                {text:"Percentage",value:"percnt"},
                { value: "data",align:"end",}],
                items:[{part:"      ",}],
            }},
              //mounted for provide cach memory
      mounted() {this.retrieveOthercontrib();},
      methods:{ retrieveOthercontrib(){
        http
        .get("/Othercontribs")
        .then(response => {
          this.rows = response.data;
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        });},
        refreshlist(){
          this.retrieveOthercontrib();
        },
      

              //adding a new row
               addnew(){this.isEditing=true
                   this.rows.push({name:'',description:'',amount:'',percent:'',})},
              
              //after editing saving the data
               save() {
                 
                 var data ={                 
                   name:this.rows.name,

                 description:this.rows.description,
                 amount:this.rows.amount                 
                 }
                http
                .post("/Othercontribs/c",data)
                .then(response => {
                  console.log(response.data)
                })
                   this.isEditing = false;
                      },
              //for delete a particular row
              deleteitem(row) {
               
                   const index = this.rows.indexOf(row)
              // confirm message for delete
              confirm('Are you sure you want to delete this row?') && this.rows.splice(index, 1)
               http
                .delete("/api/Othercontribs/d/"+this.rows.name).then(response => {
                  console.log(response.data);
                  this.$emit("refreshlist");
                  this.$router.push('/');
                })
                              },},
      computed:{
              //to find subtotal percentage
               subtpercent(){ if(this.sum==0){return 0}
                else{
                 return Math.round((this.sum/this.total)*100)}
                    },
            // to find sos contribution percentage
              sospercnt(){
                if(this.itemamount==0){
                return 0
                }
               else{
                return Math.round((this.itemamount/this.total)*100)
                }
                },
          //to find expected total
        total(){
             if(this.rows.amount==0){
               return 0
               }
             else{
               return parseInt(this.itemamount)+parseInt(this.sum)
                 }
                },
          //to find sub total taking values from rows as row.amount
         sum(){
              return this.rows.reduce((sum, row) => {
              return sum+ parseInt(row.amount);
              }, 0)

              }
} 
}              
</script> 
<style>
.head{
  
   background:coral;
}
th{
    background:	coral;
}
.headr{
  
   background:#808080;
}
</style>


