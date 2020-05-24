    import React, { Component } from "react";
    import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Picker,
    Switch,
    Button,
    Modal,
    Alert,
    } from "react-native";
    import * as Animatable from "react-native-animatable";
    import DatePicker from "react-native-datepicker";
    import * as Permissions from "expo-permissions";
    import * as Calendar from "expo-calendar";
    import { Notifications } from "expo";

    class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        guests: 1,
        VIP: false,
        date: "",
        // showModal: false,
        };
        this.resetForm = this.resetForm.bind(this);
        this.handleReservation = this.handleReservation.bind(this);
    }

    static navigationOptions = {
        title: "Reserve Table",
    };

    handleReservation() {
        console.log(JSON.stringify(this.state));

        const { guests, VIP, date } = this.state;

        Alert.alert(
        "Your Reservation OK?",
        `Number of Guests: ${guests}\nV.I.P? ${
            VIP ? "Yes" : "No"
        }\nDate and Time: ${date}`,
        [
            {
            text: "Cancel",
            onPress: () => this.resetForm(),
            style: "cancel",
            },
            {
            text: "OK",
            onPress: () => {
                this.addReservationToCalendar(this.state.date);
                this.presentLocalNotification(this.state.date);
                this.resetForm();
            },
            },
        ],
        { cancelable: false }
        );
    }

    obtainDefaultCalendarId = async () => {
        return (await Calendar.getCalendarsAsync())[0].id;
    };

    obtainCalendarPermission = async () => {
        const calendarPermission = await Permissions.askAsync(Permissions.CALENDAR);

        return calendarPermission;
    };

    addReservationToCalendar = async (date) => {
        const id = await this.obtainDefaultCalendarId();
        console.log(id);
        if (this.obtainCalendarPermission()) {
        await Calendar.createEventAsync(id, {
            title: "Con Fusion Table Reservation",
            startDate: new Date(Date.parse(date)),
            endDate: new Date(Date.parse(date) + 2 * 60 * 60 * 1000),
            timeZone: "Asia/Hong_Kong",
            location:
            "121, Clear Water bay Road, Clear Water Bay, Kowloon, Hong Kong",
        });
        }
    };

    // toggleModal() {
    //   this.setState({
    //     showModal: !this.state.showModal,
    //   });
    // }

    resetForm() {
        this.setState({
        guests: 1,
        VIP: false,
        date: "",
        showModal: false,
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(
        Permissions.USER_FACING_NOTIFICATIONS
        );
        if (permission.status !== "granted") {
        // The permissions was granted?
        permission = await Permissions.askAsync(
            Permissions.USER_FACING_NOTIFICATIONS
        );
        if (permission.status !== "granted") {
            Alert.alert("Permission not granted to show notifications");
        }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
        title: "Your Reservation",
        body: `Reservation for ${date} requested`,
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            vibrate: true,
            color: "#5122A8",
        },
        });
    }

    render() {
        return (
        <ScrollView>
            <Animatable.View animation="zoomInUp" duration={2000} delay={1000}>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                style={styles.formItem}
                selectedValue={this.state.guests}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                    guests: itemValue,
                    });
                }}
                >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>V.I.P?</Text>
                <Switch
                style={styles.formItem}
                value={this.state.VIP}
                onTintColor="#ffffff"
                onValueChange={(value) => this.setState({ VIP: value })}
                ></Switch>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                style={{
                    flex: 2,
                    marginRight: 20,
                }}
                date={this.state.date}
                format=""
                mode="datetime"
                placeholder="Select date and Time"
                minDate={new Date().toISOString()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    },
                    dateInput: {
                    marginLeft: 36,
                    },
                }}
                onDateChange={(date) => {
                    this.setState({ date: date });
                }}
                />
            </View>
            <View style={styles.formRow}>
                <Button
                title="Reserve"
                color="#003459"
                onPress={() => this.handleReservation()}
                accessibilityLabel="Learn more about this purple blue button"
                />
            </View>
            </Animatable.View>
            {/* <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => {
                this.toggleModal();
                this.resetForm();
            }}
            onRequestClose={() => {
                this.toggleModal();
                this.resetForm();
            }}
            >
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>Your Reservation</Text>
                <Text style={styles.modalText}>
                Number of Guests: {this.state.guests}
                </Text>
                <Text style={styles.modalText}>
                V.I.P? : {this.state.VIP ? "Yes" : "No"}
                </Text>
                <Text style={styles.modalText}>Date & Time: {this.state.date}</Text>
                <Button
                color="#003459"
                title="Close"
                onPress={() => {
                    this.toggleModal();
                    this.resetForm();
                }}
                />
            </View>
            </Modal> */}
        </ScrollView>
        );
    }
    }

    const styles = StyleSheet.create({
    formRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: "center",
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "#007ea7",
        textAlign: "center",
        color: "white",
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    },
    });

    export default Reservation;
