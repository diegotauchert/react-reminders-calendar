export class AppointmentService {
  static save(appointment) {
    if (appointment.id === null) {
      try {
        const appointments = window.localStorage.getItem("Appointments")
          ? JSON.parse(window.localStorage.getItem("Appointments"))
          : [];
        appointment.id = this.generateId();
        appointments.push(appointment);
        console.log(appointments);
        window.localStorage.setItem(
          "Appointments",
          JSON.stringify(appointments)
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      this.edit(appointment);
    }
  }

  static delete(id) {
    try {
      const appointments = JSON.parse(
        window.localStorage.getItem("Appointments")
      ).filter((ap) => ap.id !== id);
      window.localStorage.setItem("Appointments", JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }

  static edit(appointmentNew) {
    try {
      const appointments = JSON.parse(
        window.localStorage.getItem("Appointments")
      ).map((ap) => {
        if (ap.id === appointmentNew.id) {
          return appointmentNew;
        }
        return ap;
      });
      window.localStorage.setItem("Appointments", JSON.stringify(appointments));

      window.location.reload(false);
    } catch (e) {
      console.error(e);
    }
  }

  static deleteAllDay(day) {
    try {
      const appointments = JSON.parse(
        window.localStorage.getItem("Appointments")
      ).filter((ap) => ap.day !== day);
      window.localStorage.setItem("Appointments", JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }

  static clear() {
    try {
      window.localStorage.setItem("Appointments", JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
  }

  static getList() {
    try {
      return window.localStorage.getItem("Appointments")
        ? JSON.parse(window.localStorage.getItem("Appointments"))
        : [];
    } catch (e) {
      console.error(e);
    }
  }

  static generateId() {
    return new Date().getUTCMilliseconds();
  }
}
