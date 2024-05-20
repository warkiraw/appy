// App.js file 

import { StatusBar } from "expo-status-bar"; 
import { useState } from "react"; 
import { 
	Button, 
	StyleSheet, 
	Text, 
	Image, 
	SafeAreaView,
	View 
} from "react-native"; 
import * as ImagePicker from "expo-image-picker"; 
import Modal from "react-native-modal";

const paintings = [
  {
    author: "ОЗА",
	avtor:"Ро́за Умбе́товна Джама́нова",
    image: require("../Снимок экрана 2024-05-16 125339.png"),
	description:"2013, Алма-Ата, Казахстан) — советская, казахская оперная певица (сопрано), педагог. Народная артистка СССР (1959)[1].Родилась в Актюбинске. В Уральске окончила музыкальную школу, затем, в 1949 году — музыкальное училище по классу гобоя и вокала. В 1949—1954 годах училась в Алма-Ате, в Государственном институте искусств им. Курмангазы (ныне Казахская национальная консерватория имени Курмангазы) в классе вокала у А. М. Курганова.С 1953 года — солистка Казахского театра оперы и балета им. Абая (Алма-Ата).Также выступала как концертная певица.Обладала прекрасным голосом своеобразного серебристого тембра. Психологическая тонкость и глубина создаваемых ею образов, высокая вокальная культура — являются отличительными чертами её исполнительского стиля.",
  },
  {
    author: "Vincent van Gogh",
    title: "The Starry Night",
    description: "The Starry Night is an oil on canvas painting by Dutch Post-Impressionist painter Vincent van Gogh.",
  },
  // Add more paintings and their descriptions here
];
export default function AR() { 
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [image, setImage] = useState(null); 
	const [extractedText, setExtractedText] = useState(""); 
	const [selectedPainting, setSelectedPainting] = useState(null);
	const pickImageGallery = async () => { 
		let result = 
			await ImagePicker.launchImageLibraryAsync({ 
				mediaTypes: 
					ImagePicker.MediaTypeOptions.Images, 
				allowsEditing: true, 
				base64: true, 
				allowsMultipleSelection: false, 
			}); 
		if (!result.canceled) { 
			performOCR(result.assets[0]); 
			setImage(result.assets[0].uri); 
		} 
	}; 
	const pickImageCamera = async () => { 
		let result = await ImagePicker.launchCameraAsync({ 
			mediaTypes: ImagePicker.MediaTypeOptions.Images, 
			allowsEditing: true, 
			base64: true, 
			allowsMultipleSelection: false, 
		}); 
		if (!result.canceled) { 
			performOCR(result.assets[0]); 
			setImage(result.assets[0].uri); 
		} 
	}; 
	const performOCR = (file) => { 
		let myHeaders = new Headers(); 
		myHeaders.append( 
			"apikey", 
			// ADDD YOUR API KEY HERE 
			"FEmvQr5uj99ZUvk3essuYb6P5lLLBS20"
		); 
		myHeaders.append( 
			"Content-Type", 
			"multipart/form-data"
		); 

		let raw = file; 
		let requestOptions = { 
			method: "POST", 
			redirect: "follow", 
			headers: myHeaders, 
			body: raw, 
		}; 

		// Send a POST request to the OCR API 
		fetch( 
			"https://api.apilayer.com/image_to_text/upload", 
			requestOptions 
		) 
			.then((response) => response.json()) 
			.then((result) => { 
        setExtractedText(result["all_text"]);
		console.log(result["all_text"]);
        const author = paintings.find(painting => result["all_text"].toLowerCase().includes(painting.author.toLowerCase()));
        if (author) {
			console.log(author.author);
          // Display information about the painting
          	setSelectedImage(author.image);
        	setModalVisible(true);
			setSelectedPainting(author);
        } else {
          // Author not found in the text
          alert("Author not found in the text.");
			}}) 
			.catch((error) => console.log("error", error)); 
	}; 

	return ( 
		<SafeAreaView style={styles.container}> 
			<Text style={styles.heading}> 
				Добро Пожаловать в Онлайн Музей
			</Text> 
			<Text style={styles.heading2}> 
				Информация о картине
			</Text> 
			<Button 
				title="Pick an image from gallery"
				onPress={pickImageGallery} 
			/> 
			<Button 
				title="Pick an image from camera"
				onPress={pickImageCamera} 
			/> 
			{image && ( 
				<Image 
					source={{ uri: image }} 
					style={{ 
						width: 400, 
						height: 300, 
						objectFit: "contain", 
					}} 
				/> 
			)} 
			<Modal
				isVisible={modalVisible}
				onBackdropPress={() => setModalVisible(false)}
				onBackButtonPress={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<Text style={styles.modalText}>Автор: {selectedPainting?.avtor}</Text>
					<Text style={styles.modalText}>Описание: {selectedPainting?.description}</Text>
					<Image
						source={selectedPainting?.image}
						style={{ width: 200, height: 200 }}
					/>
					<Button title="Close" onPress={() => setModalVisible(false)} />
				</View>
			</Modal>

      <Image
        source={paintings.image}
        style={{
          width: 400,
          height: 300,
          objectFit: "contain",
        }}
      />

			<StatusBar style="auto" /> 
		
		</SafeAreaView> 
		
	); 
} 

const styles = StyleSheet.create({ 
	container: { 
		display: "flex", 
		alignContent: "center", 
		alignItems: "center", 
		justifyContent: "space-evenly", 
		backgroundColor: "#fff", 
		height: "100%", 
	}, 
	heading: { 
		fontSize: 28, 
		fontWeight: "bold", 
		marginBottom: 10, 
		color: "green", 
		textAlign: "center", 
	}, 
	heading2: { 
		fontSize: 22, 
		fontWeight: "bold", 
		marginBottom: 10, 
		color: "black", 
		textAlign: "center", 
	}, 
	text1: { 
		fontSize: 16, 
		marginBottom: 10, 
		color: "black", 
		fontWeight: "bold", 
	}, 
	modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
    },
});
