import React, { useState } from "react"

const YourFormComponent = () => {
    const [formData, setFormData] = useState({
        name: "",
        completed: false,
        owner: "",
        applications: [],
        description: "",
        deadline: "",
        bounty: 0
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you can handle form submission, for example, send data to backend
        console.log(formData)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-black text-white p-4 rounded-lg shadow-lg">
            <label className="block mb-2">
                <span>Name:</span>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 bg-black rounded-md border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                />
            </label>
            <label className="block mb-2">
                <span>Completed:</span>
                <input
                    type="checkbox"
                    name="completed"
                    checked={formData.completed}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            completed: e.target.checked
                        })
                    }
                    className="mt-1"
                />
            </label>
            <label className="block mb-2">
                <span>Owner:</span>
                <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 bg-black rounded-md border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                />
            </label>
            <label className="block mb-2">
                <span>Description:</span>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 bg-black rounded-md border border-gray-700 text-white focus:outline-none focus:border-gray-500"></textarea>
            </label>
            <label className="block mb-2">
                <span>Deadline:</span>
                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 bg-black rounded-md border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                />
            </label>
            <label className="block mb-2">
                <span>Bounty:</span>
                <input
                    type="number"
                    name="bounty"
                    value={formData.bounty}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 bg-black rounded-md border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                />
            </label>
            <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </form>
    )
}

export default YourFormComponent
