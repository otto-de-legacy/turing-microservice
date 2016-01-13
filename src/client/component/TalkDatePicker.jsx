import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

class TalkDatePicker extends React.Component {
  render() {
    return (
      <div>
        <DatePicker
          hintText='Inline'
          container='inline'
        />
      </div>
    );
  }
}

export default TalkDatePicker;
