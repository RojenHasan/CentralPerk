import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from "./store"
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}


