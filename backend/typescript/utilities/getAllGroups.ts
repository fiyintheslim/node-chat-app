import {postgresPool} from "../app"

const getGroups = async (id:number) => {
    const client = await postgresPool;

    const results = await client.query("SELECT groupid FROM groups_participants WHERE participant=$1", [id])
    console.log(results.rows);

    return results.rows
}

export default getGroups;