export const expirationMessage = ({
  entity,
  personInCharge,
  complianceList,
  dateSubmitted,
  typeOfCompliance,
  remainingDays,
  expirationDate,
  frequency,
}) => {
  const submitted = new Date(dateSubmitted);
  const expiration = new Date(expirationDate);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedSubmitted = submitted.toLocaleDateString("en-US", options);
  const formattedExpiration = expiration.toLocaleDateString("en-US", options);
  return `<html>
<head>
  <style>
    .content {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 650px;
      margin: 0 auto;
      padding: 25px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #1a5276;
      color: #1a5276;
    }
    .table-container {
      margin: 20px 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 15px 0;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    }
    th {
      background-color: #FF5349;
      color: white;
      font-weight: bold;
      text-align: left;
      padding: 12px;
    }
    td {
      border: 1px solid #ddd;
      padding: 12px;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .renew-btn {
      background-color: #FF5349;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      font-weight: bold;
      margin-top: 15px;
      text-align: center;
      transition: background-color 0.3s;
    }
    .renew-btn:hover {
      background-color: #c0392b;
    }
    .footer {
      margin-top: 30px;
      border-top: 1px solid #e0e0e0;
      padding-top: 15px;
      color: #666;
    }
    .company-name {
      font-weight: bold;
      color: #1a5276;
    }
    .important {
      color: #c0392b;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="header">
      <h2>Subscription Expiration Reminder</h2>
    </div>
    
    <p>Dear ${personInCharge},</p>
    
    <p>Your subscription "<strong>${complianceList}</strong>" is expiring in <span class="important">${remainingDays} days</span>.</p>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Entity</th>
            <th>Compliance List</th>
            <th>Date Submitted</th>
            <th>Expiration Date</th>
            <th>Type of Compliance</th>
            <th>Frequency of Compliance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${entity}</td>
            <td>${complianceList}</td>
            <td>${formattedSubmitted}</td>
            <td>${formattedExpiration}</td>
            <td>${typeOfCompliance}</td>
            <td>${frequency}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <p>Please take the necessary actions to ensure continued compliance.</p>
    
    <div style="text-align: center;">
      <a style="color: white;" href="${
        process.env.NODE_ENV === "development"
          ? process.env.APP_FRONTEND_URL_DEV
          : process.env.APP_FRONTEND_URL
      }" class="renew-btn">Renew Now</a>
    </div>
    
    <div class="footer">
      <p>Best regards,</p>
      <p class="company-name">Seiwa Kaiun Philippines Inc.</p>
    </div>
  </div>
</body>
</html>`;
};

export const expiredMessage = ({ personInCharge, complianceList }) => {
  return `<html>
<head>
  <style>
    .content {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 650px;
      margin: 0 auto;
      padding: 25px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #1a5276;
      color: #1a5276;
    }
    .renew-btn {
      background-color: #c0392b;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      font-weight: bold;
      margin-top: 15px;
      text-align: center;
      transition: background-color 0.3s;
    }
    .renew-btn:hover {
      background-color: #a93226;
    }
    .footer {
      margin-top: 30px;
      border-top: 1px solid #e0e0e0;
      padding-top: 15px;
      color: #666;
    }
    .company-name {
      font-weight: bold;
      color: #1a5276;
    }
    .important {
      color: #c0392b;
      font-weight: bold;
    }
    .alert-box {
      background-color: #fadbd8;
      border-left: 4px solid #c0392b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="header">
      <h2>Subscription Expired</h2>
    </div>
    
    <p>Dear ${personInCharge},</p>
    
    <div class="alert-box">
      <p>Your subscription "<strong>${
        complianceList
      }</strong>" has <span class="important">expired</span>.</p>
    </div>
    
    <p>Please take immediate action to renew your subscription and ensure continued compliance.</p>
    
    <div style="text-align: center;">
      <a style="color: white;" href="${
        process.env.NODE_ENV === "development"
          ? process.env.APP_FRONTEND_URL_DEV
          : process.env.APP_FRONTEND_URL
      }" class="renew-btn">Renew Now</a>
    </div>
    
    <div class="footer">
      <p>Best regards,</p>
      <p class="company-name">Seiwa Kaiun Philippines Inc.</p>
    </div>
  </div>
</body>
</html>`;
};
