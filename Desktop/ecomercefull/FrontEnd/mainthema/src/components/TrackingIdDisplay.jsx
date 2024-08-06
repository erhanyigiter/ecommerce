import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button } from 'reactstrap';

const TrackingIdDisplay = ({ trackingId }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    Swal.fire({
      title: 'Copied!',
      text: 'Tracking ID has been copied to clipboard.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div style={{
      backgroundColor: '#f1f1f1',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <p>Tracking ID: <strong>{trackingId}</strong></p>
      <Button color="success" size="lg" onClick={copyToClipboard}>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};

export default TrackingIdDisplay;
