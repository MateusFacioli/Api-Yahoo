import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Content from './Content'

const ButtonCollapse = (props) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const hide = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="primary" onClick={hide} style={{ marginBottom: '1rem' }}>Explore</Button>
      <Collapse isOpen={isOpen}>
        {/* <Card>
          <CardBody> 
          Anim pariatur cliche reprehenderit,
           enim eiusmod high life accusamus terry richardson ad squid. Nihil
           anim keffiyeh helvetica, craft beer labore wes anderson cred
           nesciunt sapiente ea proident.
          </CardBody>
        </Card> */}
        {/* <Content/>   */}
      </Collapse>
    </div>
  );
}
export default ButtonCollapse;  