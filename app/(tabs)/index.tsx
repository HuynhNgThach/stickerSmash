import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import { type ImageSource } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const placeHolderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined)


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert('You did not select any image.')
    }
  }
  const onReset = () => {
    setShowAppOptions(false)
  }
  const onAddSticker = () => {
    setIsModalVisible(true)
  }
  const onModalClose = () => {
    setIsModalVisible(false)
  }
  const onSaveImageAsync = async () => {

  }
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={placeHolderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker stickerSource={pickedEmoji} imageSize={40} />}
      </View>
      {
        showAppOptions ? (
          <View style={styles.optionContainer}>
            <View style={styles.optionRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
          </View>
        )
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff'
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});