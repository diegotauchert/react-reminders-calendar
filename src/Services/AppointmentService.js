export class AppointmentService {
  static save(appointment) {
    if (appointment.id === null) {
      const appointments = window.localStorage.getItem("Appointments")
        ? JSON.parse(window.localStorage.getItem("Appointments"))
        : [];
      appointments.push({
        id: this.generateId(),
        ...appointment,
      });
      console.log(appointments);
      window.localStorage.setItem("Appointments", JSON.stringify(appointments));
    } else {
      this.edit(appointment);
    }
  }

  static delete(id) {
    const appointments = JSON.parse(
      window.localStorage.getItem("Appointments")
    ).filter((ap) => ap.id !== id);
    window.localStorage.setItem("Appointments", JSON.stringify(appointments));
  }

  static edit(appointmentNew) {
    const appointments = JSON.parse(
      window.localStorage.getItem("Appointments")
    ).map((ap) => {
      if (ap.id === appointmentNew.id) {
        return appointmentNew;
      }
      return ap;
    });
    window.localStorage.setItem("Appointments", JSON.stringify(appointments));
  }

  static deleteAllDay(day) {
    const appointments = JSON.parse(
      window.localStorage.getItem("Appointments")
    ).filter((ap) => ap.day !== day);
    window.localStorage.setItem("Appointments", JSON.stringify(appointments));
  }

  static clear() {
    window.localStorage.setItem("Appointments", JSON.stringify([]));
  }

  static getList() {
    return window.localStorage.getItem("Appointments")
      ? JSON.parse(window.localStorage.getItem("Appointments"))
      : [];
  }

  static generateId() {
    return new Date().getUTCMilliseconds();
  }
}
