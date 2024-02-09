import React, { useState } from "react"

const YourFormComponent = () => {
    const [formData, setFormData] = useState({
        name: "",
        applicant: "",
        task: "",
        status: "pending",
        description: "",
        demoLink: ""
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
                <span>Applicant:</span>
                <input
                    type="text"
                    name="applicant"
                    value={formData.applicant}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 bg-black rounded-md border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                />
            </label>
            <label className="block mb-2">
                <span>Task:</span>
                <input
                    type="text"
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 p-2 bg-black rounded-md border border-gray-700 text-white focus:outline-none focus:border-gray-500"
                />
            </label>
            <label className="block mb-2">
                <span>Status:</span>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 bg-black rounded-md border border-gray-700 text-white focus:outline-none focus:border-gray-500">
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
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
                <span>Demo Link:</span>
                <input
                    type="text"
                    name="demoLink"
                    value={formData.demoLink}
                    onChange={handleChange}
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
