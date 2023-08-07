import Card from 'react-bootstrap/Card';

function OrderCard({Title,SubTitle}) {
  return (
    <Card style={{width:'15rem'}} className='d-flex justify-content-center'>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{Title}</Card.Subtitle>
        <Card.Title>{SubTitle}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default OrderCard;