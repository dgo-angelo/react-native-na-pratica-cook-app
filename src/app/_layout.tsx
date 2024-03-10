import { 
  useFonts, 
  Poppins_400Regular, 
  Poppins_700Bold, 
  Poppins_500Medium 
} from '@expo-google-fonts/poppins';
import { Slot } from 'expo-router';

export default function Layout() {

  const [fontsLoadeds] =useFonts({ 
    Poppins_400Regular, 
    Poppins_700Bold, 
    Poppins_500Medium 
  })

  if (!fontsLoadeds){
    return
  }
  return fontsLoadeds ?  <Slot /> : null;
}
