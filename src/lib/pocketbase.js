import PocketBase from 'pocketbase';

const url = 'http://127.0.0.1:8090'
export const client = new PocketBase(url)

client.autoCancellation(false);

export async function getExpenses() {
    return await client.collection("expenses").getFullList();
}

export async function createExpense(name, amount, category) {
    const data={expense_name: name, expense_amount: amount, Category: category}
    await client.collection("expenses").create(data);
}

export async function deleteExpense(id)
{
    await client.collection("expenses").delete(id);
    window.location.reload();
}

export async function register(data) {
    try {
        await client.collection('users').create(data)
        await client.collection("users").authWithPassword(data.email, data.password);
        alert("User successfully created")
    } catch (e) {
        alert(e)
    }   
}

export async function Login(data) {
    console.log(data)
    try {
        const authData = await client
            .collection("users")
            .authWithPassword(data.email, data.password);
        
    } catch (e){
        alert("Error, invalid login")
    }
  }