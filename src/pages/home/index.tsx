import React from 'react';
import { Link, useOutlet } from '@moneko/react';
import { Button, Container } from '@mui/material';

const Home = () => {
  const outlet = useOutlet();

  return (
    <Container>
      Home
      <br />
      <Link to="/chat">
        <Button>Link chat</Button>
      </Link>
      {outlet}
    </Container>
  );
};

export default Home;
