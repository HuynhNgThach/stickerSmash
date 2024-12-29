import { Image, type ImageSource } from "expo-image"
import { StyleSheet } from "react-native"

type props = {
  imgSource: ImageSource,
  selectedImage?: string
}
export default function ImageViewer({ imgSource, selectedImage }: props) {
  const img = selectedImage ? { uri: selectedImage } : imgSource
  return <Image source={img} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  }
})