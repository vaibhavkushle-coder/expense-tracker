import { useEffect, useState } from 'react';

function App(){

  const [title,setTitle]=useState("");
  const [amount,setAmount]=useState("");
  const [expenses,setExpenses]=useState(()=>{
    try{
      let save=localStorage.getItem("expenses");
      return save?JSON.parse(save):[];
    }catch{
     return [];
    }
  });
  const [category,setCategory]=useState("Food");
  const [filter,setFilter]=useState("All");
  const [editIndex,setEditIndex]=useState(null);
  const [search,setSearch]=useState("");


  function editExpense(index){
    setTitle(expenses[index].title);
    setAmount(expenses[index].amount);
    setCategory(expenses[index].category);
    setEditIndex(index);
  }

  
  const filteredExpenses=expenses.filter((item)=>{
   const categoryMatch=
   filter==="All" || item.category===filter;

   const searchMatch=item.title.toLowerCase().includes(search.toLowerCase());

   return categoryMatch && searchMatch;
  });


  function deleteExpense(index){
 let newExpenses=expenses.filter((item,i)=>i!==index);
 setExpenses(newExpenses);
  }


  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expenses));
  },[expenses]);


  function addExpense(){

    if(title==="" || amount==="")return;


   if(editIndex!==null){
    let updatedExpenses=[...expenses];
    updatedExpenses[editIndex]={title,amount,category};
    setExpenses(updatedExpenses);
    setEditIndex(null);
   }else{
        const newExpense={
      title:title,
      amount:amount,
      category:category
    };
    setExpenses([...expenses,newExpense]);

   }
    setTitle("");
    setAmount("");
    setCategory("Food");
  }

  let total=expenses.reduce((sum,item)=>sum+Number(item.amount),0);


  return(
    <div style={{
      display:"flex",
      background:"#0f172a",
      color:"white",
      textAlign:"center",
      padding:"50px",
      minHeight:"100vh"
    }}>

      <div style={{
        padding:"50px",
        background:"#1e293b",
        margin:"auto",
        borderRadius:"10px",
        boxShadow:"0 0 10px rgba(0,0,0,0.5)",
        width:"350px",
        listStyle:"none"
      }}>

        <h1 style={{lineHeight:"35px"}}>💰Expense Tracker</h1>


<input
type="text"
placeholder="🖋️Enter title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
onKeyDown={(e)=>{
  if(e.key==="Enter"){
    addExpense();
  }
}}

style={{
  padding:"10px",
  height:"10px",
  borderRadius:"5px",
  border:"none",
  background:"black",
  color:"white"
}}
/>

<input
type="number"
placeholder='💵Enter amount'
value={amount}
onChange={(e)=>setAmount(e.target.value)}
onKeyDown={(e)=>{
  if(e.key==="Enter"){
    addExpense();
  }
}}
style={{
  padding:"10px",
  height:"10px",
  borderRadius:"5px",
  border:"none",
  background:"black",
  color:"white",
  marginTop:"10px"
}}
/>

<br></br>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
style={{
  cursor:"pointer",
  padding:"5px",
  marginTop:"5px",
  borderRadius:"5px",
  border:"none"
}}>
  <option>Food</option>
  <option>Travel</option>
  <option>Shopping</option>
  <option>Entertainment</option>
</select>

<br></br>

<button onClick={addExpense}
style={{
  padding:"10px",
  marginBottom:"5px",
  borderRadius:"5px" ,
  marginTop:"5px",
  border:"none",
  cursor:"pointer",
  background:"#3b82f6",
  border:filter==="All"?"2px solid black":"none",
  transition:"0.3s"
}}
onMouseEnter={(e)=>e.target.style.transform="scale(1.07)"}
      onMouseLeave={(e)=>e.target.style.transform="scale(1)"}
>{editIndex!==null?"Update Expense":"➕Add Expense"}</button>

<br></br>

<div style={{
  display:"flex",
  flexWrap:"wrap",
  gap:"5px",
}}>


<button onClick={()=>setFilter("All")} style={{
  cursor:"pointer",
  padding:"5px",
  borderRadius:"5px",
  border:"none",
  background:"pink",
  color:"black",
  transition:"0.3s"
}}
onMouseEnter={(e)=>e.target.style.transform="scale(1.07)"}
      onMouseLeave={(e)=>e.target.style.transform="scale(1)"}
>🔁All</button>


<button onClick={()=>setFilter("Food")} style={{
  cursor:"pointer",
  padding:"5px",
  borderRadius:"5px",
  border:"none",
  background:"orange",
  color:"black",
  transition:"0.3s"
}}
onMouseEnter={(e)=>e.target.style.transform="scale(1.07)"}
onMouseLeave={(e)=>e.target.style.transform="scale(1)"}>🍕Food</button>

<button onClick={()=>setFilter("Travel")} style={{
  cursor:"pointer",
  padding:"5px",
  border:"none",
  background:"blue",
  color:"white",
  transition:"0.3s",
  borderRadius:"5px"
}}
onMouseEnter={(e)=>e.target.style.transform="scale(1.07)"}
      onMouseLeave={(e)=>e.target.style.transform="scale(1)"}>🚗Travel</button>

<button onClick={()=>setFilter("Shopping")} style={{
  cursor:"pointer",
  padding:"5px",
  border:"none",
  background:"pink",
  color:"black",
  transition:"0.3s",
  borderRadius:"5px"
}}
onMouseEnter={(e)=>e.target.style.transform="scale(1.07)"}
      onMouseLeave={(e)=>e.target.style.transform="scale(1)"}>🛍️Shopping</button>

<button onClick={()=>setFilter("Entertainment")} style={{
  cursor:"pointer",
  padding:"5px",
  border:"none",
  background:"pink",
  color:"black",
  marginTop:"5px",
  borderRadius:"5px",
  transition:"0.3s",
}}
onMouseEnter={(e)=>e.target.style.transform="scale(1.07)"}
      onMouseLeave={(e)=>e.target.style.transform="scale(1)"}>🎮Entertainment</button>

</div>

<br></br>

<input
type="text"
placeholder='🔍Search here'
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
  padding:"6px",
  borderRadius:"5px",
  border:"none",
  background:"#f8fafc",
  color:"black",
  marginTop:"10px",
  marginBottom:"15px"
}}
/>

  <h2>Total:₹{total}</h2>


<ul style={{
  listStyle:"none",
  padding:"0",
  marginTop:"20px"
}}>

{filteredExpenses.length===0 && (<p>No expense found...</p>)}

  {filteredExpenses.map((item,i)=>(
    <li 
style={{
  background:"#334155",
  color:"white",
  padding:"12px",
  borderRadius:"10px",
  marginBottom:"10px",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  flexWrap:"wrap"
}}
key={i} >{item.title}-₹{item.amount}- <span style={{
  background:"orange",
  padding:"3px 8px",
  borderRadius:"20px",
  fontSize:"12px",
  color:"black"

}}>{item.category}</span>

<div style={{
  display:"flex",
  gap:"5px"
}}>

    <button onClick={()=>deleteExpense(i)}style={{
      padding:"12px",
      marginRight:"10px",
      marginLeft:"20px",
      marginBottom:"10px",
      borderRadius:"5px",
      border:"none",
      background:"#ef4444",
      cursor:"pointer",
      transition:"0.3s"
    }}
    onMouseEnter={(e)=>e.target.style.transform="scale(1.07)"}
      onMouseLeave={(e)=>e.target.style.transform="scale(1)"}>❌Delete</button>

    <button onClick={()=>editExpense(i)}
      style={{
        padding:"12px",
        border:"none",
        background:"#f59e0b",
        cursor:"pointer",
        borderRadius:"5px",
        transition:"0.3s"
      }}
      onMouseEnter={(e)=>e.target.style.transform="scale(1.07)"}
      onMouseLeave={(e)=>e.target.style.transform="scale(1)"}
    >
      ✏️Edit
    </button>
    </div>
    </li>
  ))}
</ul>
      </div>
    </div>
  );
}
export default App;