export class AppointmentService {

  static save(appointment) {
    const appointments = (window.localStorage.getItem('Appointments')) ?
      JSON.parse(window.localStorage.getItem('Appointments')) : [];
    appointments.push(appointment);
    window.localStorage.setItem('Appointments', JSON.stringify(appointments));
  }

  static delete(e) {
    
    alert('Appointment Deleted');
  }

  static getList() {
    return (window.localStorage.getItem('Appointments')) ?
      JSON.parse(window.localStorage.getItem('Appointments')) : [];
  }
}
