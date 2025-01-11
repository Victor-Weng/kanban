import './home.css';
import Kanban from './components/kanban';
import Head from 'next/head';

export default function Home() {
  return (
  <div className="container"><Kanban></Kanban></div>
  )
}