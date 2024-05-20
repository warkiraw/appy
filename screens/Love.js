import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { EvilIcons } from '@expo/vector-icons';

const Love = () => {
  const BOT_API_TOKEN = '6441802059:AAGzNl5sVu6sM5jCuolgAkQMTYJ52--tvVk'; // Замени 'TOKEN' на твой реальный токен бота
  const CHAT_ID = '6822777737'; // Замени 'CHAT_ID' на реальный ID чата

  const bottles = [
    { name: 'Bottle 1', image: require("../cola.jpeg") },
    { name: 'Bottle 2', image:  require("../cola.jpeg") },
    { name: 'Bottle 3', image:  require("../cola.jpeg") },
    { name: 'Bottle 4', image:  require("../cola.jpeg") },
    // Добавь остальные бутылки
  ];
  const [statusMessage, setStatusMessage] = useState('');
  const [lastUpdateId, setLastUpdateId] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderArray, setOrderArray] = useState(null);
  const [timer, setTimer] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(getTelegramUpdates, 5000); 
    return () => clearInterval(intervalId); 
  }, [lastUpdateId]);

  useEffect(() => {
    if (timer !== null) {
      if (timer > 0) {
        const timeoutId = setTimeout(() => setTimer(timer - 1), 1000);
        return () => clearTimeout(timeoutId);
      } else {
        sendNotification();
        setStatusMessage('заказ готов');
      }
    }
  }, [timer]);
  const sendNotification = async () => {
    console.log('send')
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Время истекло",
        body: 'Ваш заказ готов!',
      },
      trigger: null,
    });
  };
  const addToOrder = async (name) => {
    try {
      const currentOrder = await AsyncStorage.getItem('order');
      let orderArray = currentOrder ? JSON.parse(currentOrder) : [];
      orderArray.push(name);
      await AsyncStorage.setItem('order', JSON.stringify(orderArray));
      alert(`${name} добавлен в заказ`);
    } catch (error) {
      console.error('Error adding to order:', error);
    }
  };

  const loadCartItems = async () => {
    try {
      const currentOrder = await AsyncStorage.getItem('order');
      const items = currentOrder ? JSON.parse(currentOrder) : [];
      const itemCounts = items.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
      setCartItems(Object.entries(itemCounts));
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const removeFromCart = async (name) => {
    try {
      const currentOrder = await AsyncStorage.getItem('order');
      let orderArray = currentOrder ? JSON.parse(currentOrder) : [];
      const itemIndex = orderArray.indexOf(name);
      if (itemIndex > -1) {
        orderArray.splice(itemIndex, 1);
      }
      await AsyncStorage.setItem('order', JSON.stringify(orderArray));
      loadCartItems(); // Обновляем корзину после удаления товара
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const sendMessageToTelegram = async () => {
    try {
      const currentOrder = await AsyncStorage.getItem('order');
      if (!currentOrder) {
        alert('Ваш заказ пуст');
        return;
      }
      const orderArray = currentOrder ? JSON.parse(currentOrder) : [];
      const randomOrderNumber = Math.floor(Math.random() * 100) + 1;
      setOrderNumber(randomOrderNumber);
      setOrderArray(orderArray.join('\n'));
      
      const response = await axios.post(`https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: `Заказ №${randomOrderNumber}\n${orderArray.join('\n')}`,
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Подтвердить заказ', callback_data: `confirm_${randomOrderNumber}_${orderArray.join('\n')}` }],
            [{ text: 'Отменить заказ', callback_data: `cancel_${randomOrderNumber}_${orderArray.join('\n')}` }]
          ]
        })
      });

      console.log('Order sent:', response.data);
      await AsyncStorage.removeItem('order'); // Очистка заказа после отправки
      setOrderCompleted(true);
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  const editMessageInTelegram = async (messageId, newText) => {
    try {
      await axios.post(`https://api.telegram.org/bot${BOT_API_TOKEN}/editMessageText`, {
        chat_id: CHAT_ID,
        message_id: messageId,
        text: newText,
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Готово', callback_data: `done` }],
          ]
        })
      });
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };
  const editMessageInTelegramone = async (messageId, newText) => {
    try {
      await axios.post(`https://api.telegram.org/bot${BOT_API_TOKEN}/editMessageText`, {
        chat_id: CHAT_ID,
        message_id: messageId,
        text: newText,
        parse_mode: 'Markdown',
      });
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  const handleTelegramUpdate = (update) => {
    const callbackData = update.callback_query.data;
    console.log(callbackData)
    const messageId = update.callback_query.message.message_id;
    const [a,orderId, orderData] = callbackData.split('_');
    console.log(callbackData.split('_'))
    console.log(orderData)
    
    if (callbackData.startsWith('confirm_')) {
      setStatusMessage('заказ готовится');
      setTimer(1 * 60); // Установить таймер на 15 минут
      editMessageInTelegram(messageId, `*подтвержден* \n Заказ №${orderId} \n ${orderData}`);
    } else if (callbackData.startsWith('cancel_')) {
      setStatusMessage('заказ отменился');
      editMessageInTelegram(messageId, `Заказ №${orderId} отменен\n${orderData}`);
    } else if (callbackData.startsWith('done')) {
      setTimer(0)
      setStatusMessage('заказ готов');
      editMessageInTelegramone(messageId, `Заказ готов\n`);
    } 


    setLastUpdateId(update.update_id);
  };

  const getTelegramUpdates = async () => {
    try {
      const response = await axios.get(`https://api.telegram.org/bot${BOT_API_TOKEN}/getUpdates`, {
        params: {
          offset: lastUpdateId ? lastUpdateId + 1 : null,
        },
      });

      const updates = response.data.result;

      updates.forEach((update) => {
        if (update.callback_query) {
          handleTelegramUpdate(update);
        }
      });
    } catch (error) {
      console.error('Error getting updates:', error);
    }
  };

  const resetOrder = () => {
    setOrderCompleted(false);
    setStatusMessage('');
    setTimer(null);
    setOrderNumber(null);
    setOrderArray(null);
    setCartVisible(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!orderCompleted ? (
        <>
          <View style={styles.header}>
            {cartVisible ? (
              <TouchableOpacity onPress={() => setCartVisible(false)}>
                <Text style={styles.backButton}>{"< Назад"}</Text>
              </TouchableOpacity>
            ) : null}
            <Text style={styles.headerTitle}>{cartVisible ? "Корзина" : "Выберите напитки"}</Text>
          </View>
          {!cartVisible ? (
            <>
              <View style={styles.bottleContainer}>
                {bottles.map((bottle, index) => (
                  <View key={index} style={styles.bottle}>
                    <Image source={bottle.image} style={styles.bottleImage} />
                    <View style={styles.overlay}>
                      <Text style={styles.bottleName}>{bottle.name}</Text>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToOrder(bottle.name)}
                      >
                        <Text style={styles.addButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
              <Button title="Корзина" onPress={() => { loadCartItems(); setCartVisible(true); }} />
              {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}
              {timer !== null ? (
                <Text style={styles.timer}>Оставшееся время: {formatTime(timer)}</Text>
              ) : null}
              {orderNumber !== null ? (
                <Text style={styles.orderNumber}>Номер заказа: {orderNumber}</Text>
              ) : null}
              <Button title="Отправить заказ" onPress={sendMessageToTelegram} />
            </>
          ) : (
            <>
              {cartItems.length > 0 ? (
                cartItems.map(([name, count], index) => (
                  <View key={index} style={styles.cartItemContainer}>
                    <Image source={bottles.find(b => b.name === name).image} style={styles.cartItemImage} />
                    <Text style={styles.cartItemName}>{name}</Text>
                    <Text style={styles.cartItemCount}>Количество: {count}</Text>
                    <TouchableOpacity onPress={() => removeFromCart(name)}>
                      <Text style={styles.removeButton}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text>Ваша корзина пуста</Text>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Text style={styles.statusMessage}>{statusMessage}</Text>
          {timer !== null ? <Text style={styles.timer}>{formatTime(timer)}</Text> : null}
          {orderNumber ? <Text style={styles.orderNumber}>Номер заказа: {orderNumber}</Text> : null}
          <Text style={styles.orderNumber}>Ваш Заказ:</Text>
          {orderArray ? <Text style={styles.orderNumber}>{orderArray}</Text> : null}
          {timer==0 ? <Button onPress={resetOrder} title="Готово" /> : null}
        </>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bottle: {
    width: '45%',
    marginBottom: 20,
  },
  bottleImage: {
    width: 200,
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(0, 128, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  bottleName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#008000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusMessage: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  timer: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  orderNumber: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cartItemName: {
    flex: 1,
    fontSize: 18,
  },
  cartItemCount: {
    fontSize: 18,
  },
  removeButton: {
    fontSize: 24,
    color: '#FF0000',
  },
});

export default Love;