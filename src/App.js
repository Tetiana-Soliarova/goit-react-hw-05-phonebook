import { Component } from 'react'
import style from './App.module.css'
import fade from './Fade.module.css'
import filterFade from "./FilterFade.module.css"
import { v4 as uuidv4 } from 'uuid'
import ContactForm from './component/ContactForm/Form'
import ContactList from './component/ContactsList/ContactList'
import Filter from './component/Filter/Filter'
import Header from './component/Header/Header'
import Alert from './component/Alert/alert'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
//import fade from "./App.module.css";

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    error: false,
  }

  addContact = (data) => {
    const contact = {
      id: uuidv4(),
      name: data.name,
      number: data.number,
    }
    if (this.state.contacts.find((item) => item.name === data.name)) {
      this.setState({ error: !this.state.error })
      /*alert(`${data.name} is already in contacts`)*/
      return setTimeout(() => {
        this.setState({
          error: false,
        })
      }, 2500)
    }

    this.setState((prevState) => {
      return {
        contacts: [contact, ...prevState.contacts],
      }
    })
  }

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value })
  }

  visibleTodos = () => {
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
    )
  }

  deleteContact = (removeId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== removeId),
      }
    })
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts);

    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }

  render() {
    const { filter } = this.state
    return (
      <div className={style.color}>
        <CSSTransition
          in={this.state.error}
          timeout={250}
          classNames={fade}
          unmountOnExit
        >
          <Alert />
        </CSSTransition>
        <Header />

        <div>
          <ContactForm
            onSubmit={this.addContact}
            contacts={this.state.contacts}
          />

          <CSSTransition
            in={this.state.contacts.length >= 2}
          timeout={250}
          classNames={filterFade}
          unmountOnExit>
            <Filter value={filter} onChange={this.changeFilter} />
          </CSSTransition>
          
          

          <ContactList
            contacts={this.visibleTodos()}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    )
  }
}

export default App;
