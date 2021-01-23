import React from 'react';

import Lumberyard from './Lumberyard';
import Mine from './Mine';
import Smithy from './Smithy';

export default function Resources() {
  return (
    <div className="box">
      <p className="title yellow-text">Resources</p>
      <ul>
        <Lumberyard/>
        <Mine/>
        <Smithy/>
      </ul>
    </div>
  );
}