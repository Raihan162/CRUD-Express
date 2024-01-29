const _ = require('lodash')
const fs = require('fs')
const fileName = `${__dirname}/../../assets/db.json`

const getUsersList = async () => {

    const users = fs.readFileSync(fileName, "utf-8", (error, data) => {
        if (error) {
            // console.log(error, '<<<< ERROR USER HELPER');
            return error
        } else {
            // console.log(data, '<<<<<<< DATA USER HELPER');
            return data
        }
    })
    // console.log(users, '<<<<<<<<<< CLG USERS')

    return Promise.resolve(users)

}

const addUsers = async (dataObject) => {
    const { name, age, city } = dataObject

    try {
        const dbUser = await fs.readFileSync(fileName, "utf-8")

        const currentData = JSON.parse(dbUser)
        const addData = {
            id: currentData.length + 1,
            name,
            age,
            city
        }
        currentData.push(addData)

        const dataNewUser = await fs.writeFileSync(fileName, JSON.stringify(currentData))

        return addData
    } catch (error) {
        console.log(error)
    }
}

const updateUsers = async (dataObject) => {
    const { id, name, age, city } = dataObject
    try {
        const dbUser = await fs.readFileSync(fileName, "utf-8")

        const currentData = JSON.parse(dbUser)
        const filteredData = currentData.filter((data) => String(data.id) === id)
        console.log(filteredData)
        // const updateData = {
        //     id: filteredData[0]?.id,
        //     name: name || filteredData[0]?.name,
        //     age: age || filteredData[0]?.age,
        //     city: city || filteredData[0]?.city
        // }

        const updatedData = currentData.map((data) => {
            if (String(data.id) === id) {
                const updateData = {
                    id: filteredData[0]?.id,
                    name: name || filteredData[0]?.name,
                    age: age || filteredData[0]?.age,
                    city: city || filteredData[0]?.city
                }
                return updateData
            }
            return data
        })

        await fs.writeFileSync(fileName, JSON.stringify(updatedData))

        return getUsersList()
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async ({ id }) => {

    try {
        const dataUser = await getUsersList()

        const filteredData = JSON.parse(dataUser).filter((data) => String(data.id) !== id)
        // console.log(filteredData)
        await fs.writeFileSync(fileName, JSON.stringify(filteredData))

        return getUsersList()
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getUsersList,
    addUsers,
    updateUsers,
    deleteUser
}