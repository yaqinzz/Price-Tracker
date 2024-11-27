import mongoose from 'mongoose'

let isConnected = false // Variabel untuk melacak status koneksi

export const connectToDB = async (): Promise<void> => {
	mongoose.set('strictQuery', true)

	if (!process.env.MONGODB_URI) {
		return
	}

	if (isConnected) {
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true, // Direkomendasikan untuk MongoDB modern
			serverSelectionTimeoutMS: 10000, // Timeout untuk koneksi server
		} as mongoose.ConnectOptions) // Type casting untuk `ConnectOptions`

		isConnected = true
	} catch (error) {
		throw error // Opsional: Lempar error agar dapat ditangani di level yang lebih tinggi
	}
}
