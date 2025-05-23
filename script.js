 //Add Rule Group Button

    function addRuleGroup(afterElement = null, insertAtTop = false) {
      const div = document.createElement('div');
      div.className = 'ruleGroup';
      div.innerHTML = `
    <div class="section-title">Rule Group</div>
    <div class="flex-container">
      <div class="flex-item">
        <label>Start Date:</label>
        <input type="date" class="startDate" required />
      </div>
      <div class="flex-item">
        <label>End Date (optional):</label>
        <input type="date" class="endDate" />
      </div>
      <div class="flex-item">
        <label>Enabled:</label>
        <select class="enabled">
          <option value="true" selected>true</option>
          <option value="false">false</option>
        </select>
      </div>
    </div>

    <div class="rules"></div>
    <button onclick="addRule(this)" style="margin-right: 15px;">Add Billing Rule</button>
    <button onclick="addRuleGroup(this.parentElement)" style="margin-right: 15px;">Add Rule Group</button>
    <button class="remove-rule-group" onclick="this.parentElement.remove()" style="margin-right: 15px;">Remove Rule Group</button>
  `;

      const container = document.getElementById('groupsContainer');

      if (insertAtTop) {
        container.insertBefore(div, container.firstChild);
      } else if (afterElement) {
        container.insertBefore(div, afterElement.nextSibling);
      } else {
        container.appendChild(div);
      }
    }

    // Add Billing Rule Button
function addRule(button) {
  const rulesContainer = button.previousElementSibling;
  const div = document.createElement('div');
  div.className = 'rule';
  div.innerHTML = `
        <div class="flex-container">
          <div class="flex-item">
            <label>Billing Rule Name:</label>
            <input type="text" class="ruleName" placeholder="Enter Billing Rule name" />
          </div>
        </div>

        <div class="flex-container">
          <div class="flex-item">
            <label>Billing Adjustment (e.g. 0.00):</label>
            <input type="int" class="billingAdjustment" />
          </div>
          <div class="flex-item">
            <label>Billing Rule Type:</label>
            <select class="billingRuleType">
              <option value="percentDiscount">percentDiscount</option>
              <option value="percentIncrease">percentIncrease</option>
              <option value="fixedRate">fixedRate</option>
            </select>
          </div>
          <div class="flex-item">
            <div class="small-label">Include Data Transfer:</div>
            <div class="small-select">
              <select class="includeDataTransfer">
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
          </div>
          <div class="flex-item">
            <div class="small-label">Include RI Purchases:</div>
            <div class="small-select">
              <select class="includeRIPurchases">
                <option value="true">true</option>
                <option value="false" selected>false</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex-container">
          <div class="flex-item">
            <label>Product Name:</label>
            <input type="text" class="productName" list="productList" placeholder="Leave empty for Any Products" />
          </div>
          <div class="flex-item">
            <div class="small-label">Product Include Data Transfer:</div>
            <div class="small-select">
              <select class="productIncludeDataTransfer">
                <option value="">(inherit)</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
          </div>
          <div class="flex-item">
            <div class="small-label">Product Include RI Purchases:</div>
            <div class="small-select">
              <select class="productIncludeRIPurchases">
                <option value="">(inherit)</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
          </div>
        </div>

<!-- Region -->
        <label>Region (optional):</label>
        <input type="text" class="region" />

        <!-- usageType -->
        <div class="sub-group">
          <label>Usage Types:</label>
          <div class="usageTypes"></div>
          <div class="sub-entry">
            <button class="addUsageType small-button" type="button" onclick="addUsageType(this)">+</button>
          </div>
        </div>

        <!-- Operation -->
<div class="sub-group">
  <label>Operations:</label>
  <div class="operations"></div>
  <div class="sub-entry">
    <button class="addOperation small-button" type="button" onclick="addOperation(this)">+</button>
  </div>
</div>

<!-- RecordType -->
<div class="sub-group">
  <label>Record Types:</label>
  <div class="recordTypes"></div>
  <div class="sub-entry">
    <button class="addRecordType small-button" type="button" onclick="addRecordType(this)">+</button>
  </div>
</div>

<!-- InstanceProperties -->
<div class="sub-group">
  <label>Instance Properties:</label>
  <div class="instanceProperties"></div>
  <div class="sub-entry">
    <button class="addInstanceProperty small-button" type="button" onclick="addInstanceProperty(this)">+</button>
  </div>
</div>

<!-- LineItemDescription -->
        <div class="sub-group">
          <label>Line Item Descriptions:</label>
          <div class="lineItemDescriptions"></div>
          <div class="sub-entry">
            <button class="addLineItem small-button" type="button" onclick="addLineItemDescription(this)">+</button>
          </div>
        </div>

<!-- SavingsPlanOfferingType -->
<div class="sub-group">
  <label>Savings Plan Offering Types:</label>
  <div class="savingsPlanOfferingTypes"></div>
  <div class="sub-entry">
    <button class="addSavingsPlanOfferingType small-button" type="button" onclick="addSavingsPlanOfferingType(this)">+</button>
  </div>
</div>
<br />
<button class="remove-rule" onclick="this.parentElement.remove()">Remove Billing Rule</button>
<br />
      `;
  rulesContainer.appendChild(div);
}


function addUsageType(button) {
  const container = button.closest('.sub-group').querySelector('.usageTypes');
  const div = document.createElement('div');
  div.className = 'sub-entry';
  div.innerHTML = `
        <button type="button" class="remove-usagetype small-button" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="usageTypeName" placeholder="UsageType name..." />
      `;
  container.appendChild(div);
}

function addLineItemDescription(button) {
  const container = button.closest('.sub-group').querySelector('.lineItemDescriptions');
  const div = document.createElement('div');
  div.className = 'sub-entry';
  div.innerHTML = `
        <button type="button" class="remove-lineitem small-button" onclick="this.parentElement.remove()">×</button>
        <select class="lineItemType">
          <option value="contains">contains</option>
          <option value="startsWith">startsWith</option>
          <option value="matchesRegex">matchesRegex</option>
        </select>
        <input type="text" class="lineItemValue" placeholder="Enter LineItem Description..." />
      `;
  container.appendChild(div);
}

function addOperation(button) {
  const container = button.closest('.sub-group').querySelector('.operations');
  const div = document.createElement('div');
  div.className = 'sub-entry';
  div.innerHTML = `
    <button type="button" class="remove-lineitem small-button" onclick="this.parentElement.remove()">×</button>
    <input type="text" class="operationName" placeholder="Enter Operation name..." />
  `;
  container.appendChild(div);
}
function addRecordType(button) {
  const container = button.closest('.sub-group').querySelector('.recordTypes');
  const div = document.createElement('div');
  div.className = 'sub-entry';
  div.innerHTML = `
    <button type="button" class="remove-lineitem small-button" onclick="this.parentElement.remove()">×</button>
    <input type="text" class="recordTypeName" placeholder="Enter RecordType..." />
  `;
  container.appendChild(div);
}
function addInstanceProperty(button) {
  const container = button.closest('.sub-group').querySelector('.instanceProperties');
  const div = document.createElement('div');
  div.className = 'sub-entry';
  div.innerHTML = `
    <button type="button" class="remove-lineitem small-button" onclick="this.parentElement.remove()">×</button>
    <input type="text" class="instanceType" placeholder="Instance Type (e.g., t2)" />
    <input type="text" class="instanceSize" placeholder="Instance Size (e.g., 8xlarge)" />
    <div class="checkbox-wrapper">
      <input type="checkbox" class="reservedInstance" id="reservedInstance" />
      <label for="reservedInstance" class="checkbox-label"> Reserved</label>
    </div>
  `;
  container.appendChild(div);
}
function addSavingsPlanOfferingType(button) {
  const container = button.closest('.sub-group').querySelector('.savingsPlanOfferingTypes');
  const div = document.createElement('div');
  div.className = 'sub-entry';
  div.innerHTML = `
    <button type="button" class="remove-lineitem small-button" onclick="this.parentElement.remove()">×</button>
    <input type="text" class="savingsPlanOfferingTypeName" placeholder="Enter Savings Plan Offering Type..." />
  `;
  container.appendChild(div);
}

    //Export XML Button Function

    function generateXML() {
      const createdByInput = document.getElementById('createdBy');
      const createdBy = createdByInput.value;
      const comment = document.getElementById('comment').value || '';

      if (!createdBy) {
        alert("Created By is required.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        createdByInput.style.border = '2px solid red';
        createdByInput.focus();
        return;
      }
      createdByInput.style.border = '';

      const groups = document.querySelectorAll('.ruleGroup');
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<CHTBillingRules createdBy="${createdBy}" date="${new Date().toISOString().split('T')[0]}">\n\t<Comment>${comment}</Comment>\n`;

      groups.forEach(group => {
        let startDate = group.querySelector('.startDate').value;
        if (!startDate) {
          const now = new Date();
          startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
        }
        const endDate = group.querySelector('.endDate').value;
        const enabled = group.querySelector('.enabled').value;

        xml += `\t<RuleGroup startDate="${startDate}"${endDate ? ` endDate="${endDate}"` : ''}${enabled === "false" ? ` enabled="false"` : ''}>\n`;

        const rules = group.querySelectorAll('.rule');
        rules.forEach(rule => {
          const name = rule.querySelector('.ruleName').value;
          const adj = rule.querySelector('.billingAdjustment').value || '0.00';
          const type = rule.querySelector('.billingRuleType').value;
          const dataTransfer = rule.querySelector('.includeDataTransfer').value;
          const rip = rule.querySelector('.includeRIPurchases').value;
          const product = rule.querySelector('.productName').value || 'ANY';

          const prodDT = rule.querySelector('.productIncludeDataTransfer').value;
          const prodRIP = rule.querySelector('.productIncludeRIPurchases').value;
          const region = rule.querySelector('.region').value;

          xml += `\t\t<BillingRule name="${name}" includeDataTransfer="${dataTransfer}"${rip === "true" ? ` includeRIPurchases="true"` : ''}>\n`;
          xml += `\t\t\t<BasicBillingRule billingAdjustment="${adj}" billingRuleType="${type}"/>\n`;
          xml += `\t\t\t<Product productName="${product}"${prodDT ? ` includeDataTransfer="${prodDT}"` : ''}${prodRIP ? ` includeRIPurchases="${prodRIP}"` : ''}>`;

          let subTags = '';

          if (region) subTags += `\n\t\t\t\t<Region name="${region}"/>`;

          rule.querySelectorAll('.usageTypes .usageTypeName').forEach(el => {
            const val = el.value.trim();
            if (val) subTags += `\n\t\t\t\t<UsageType name="${val}"/>`;
          });

          rule.querySelectorAll('.operations .operationName').forEach(el => {
            const val = el.value.trim();
            if (val) subTags += `\n\t\t\t\t<Operation name="${val}"/>`;
          });

          rule.querySelectorAll('.recordTypes .recordTypeName').forEach(el => {
            const val = el.value.trim();
            if (val) subTags += `\n\t\t\t\t<RecordType name="${val}"/>`;
          });

          rule.querySelectorAll('.instanceProperties .sub-entry').forEach(entry => {
            const type = entry.querySelector('.instanceType').value.trim();
            const size = entry.querySelector('.instanceSize').value.trim();
            const reserved = entry.querySelector('.reservedInstance').checked;

            if (type || size || reserved === false || reserved === true) {
              subTags += `\n\t\t\t\t<InstanceProperties`;
              if (type) subTags += ` instanceType="${type}"`;
              if (size) subTags += ` instanceSize="${size}"`;
              subTags += ` reserved="${reserved ? 'true' : 'false'}"`;
              subTags += ` />`;
            }
          });

          rule.querySelectorAll('.lineItemDescriptions .sub-entry').forEach(item => {
            const key = item.querySelector('.lineItemType').value;
            const val = item.querySelector('.lineItemValue').value;
            if (val) subTags += `\n\t\t\t\t<LineItemDescription ${key}="${val}" />`;
          });

          rule.querySelectorAll('.savingsPlanOfferingTypes .savingsPlanOfferingTypeName').forEach(el => {
            const val = el.value.trim();
            if (val) subTags += `\n\t\t\t\t<SavingsPlanOfferingType name="${val}"/>`;
          });

          if (subTags) {
            xml += `${subTags}\n\t\t\t</Product>\n`;
          } else {
            xml += `</Product>\n`;
          }

          xml += `\t\t</BillingRule>\n`;
        });

        xml += `\t</RuleGroup>\n`;
      });

      xml += `</CHTBillingRules>`;
      document.getElementById('outputXML').value = xml;
    }

    //ExportJSON Function

    function exportJSON() {
      const bookNameInput = document.getElementById('bookName');
      const bookName = bookNameInput.value.trim();

      if (!bookName) {
        alert("Price Book Name is required.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        bookNameInput.style.border = '2px solid red';
        bookNameInput.focus();
        return;
      } else {
        bookNameInput.style.border = '';
      }
      document.getElementById('outputXML').value = '';
      if (typeof generateXML === 'function') {
        generateXML();
      }

      const xml = document.getElementById('outputXML').value;
      if (!xml) {
        alert("Failed to generate XML.");
        return;
      }

      const escapedXML = xml.replace(/"/g, '\\"');
      const json = `{"book_name":"${bookName}","specification":"${escapedXML}"}`;
      document.getElementById('outputJSON').value = json;
  updateAssignCustomerJSON('<PriceBookID_From_Previous_Command_Output>');
     updateAssignCustomerAccountJSON('<PriceBookAssignmentID_From_Previous_Command_Output>');
    }

    // Export for Terminal Function

    function exportForTerminal() {
      const bookNameInput = document.getElementById('bookName');
      const bookName = bookNameInput.value.trim();

      if (!bookName) {
        alert("Price Book Name is required.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        bookNameInput.style.border = '2px solid red';
        bookNameInput.focus();
        return;
      } else {
        bookNameInput.style.border = '';
      }
      document.getElementById('outputXML').value = '';
      if (typeof generateXML === 'function') {
        generateXML();
      }

      const xml = document.getElementById('outputXML').value;
      if (!xml) {
        alert("Failed to generate XML.");
        return;
      }

      const escapedXML = xml.replace(/"/g, '\\"');
      const jsonPayload = `{"book_name":"${bookName}","specification":"${escapedXML}"}`;

      const curlCommand = `curl -X POST https://chapi.cloudhealthtech.com/v1/price_books \\\n` +
        `  -H "Authorization: Bearer <YOUR_API_TOKEN>" \\\n` +
        `  -H "Content-Type: application/json" \\\n` +
        `  -d '${jsonPayload}'`;

      document.getElementById('outputJSON').value = curlCommand;
       updateAssignCustomerCurl('<PriceBookID_From_Previous_Command_Output>');
     updateAssignCustomerAccountCurl('<PriceBookAssignmentID_From_Previous_Command_Output>');
    }

//Assign CPB to Customer JSON
function updateAssignCustomerJSON(priceBookId) {
  const cxAPIIdInput = document.getElementById('cxAPIId').value.trim();
  const clientAPIId = cxAPIIdInput !== '' ? cxAPIIdInput : '<Enter ClientAPI ID>';

  const payload = {
    price_book_id: priceBookId,
    target_client_api_id: clientAPIId
  };

  const assignCustomerArea = document.getElementById('assignCustomerJSON');
  assignCustomerArea.value = JSON.stringify(payload, null, 2);
}
//Assign CPB to Customer CURL
function updateAssignCustomerCurl(priceBookId) {
  const cxAPIIdInput = document.getElementById('cxAPIId').value.trim();
  const clientAPIId = cxAPIIdInput !== '' ? cxAPIIdInput : '<Enter ClientAPI ID>';

  const curlCommand = `curl -X POST https://chapi.cloudhealthtech.com/v1/price_book_assignments \\
  -H "Authorization: Bearer <YOUR_API_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "price_book_id": "${priceBookId}",
    "target_client_api_id": "${clientAPIId}"
}'`;

  const assignCustomerArea = document.getElementById('assignCustomerJSON');
  assignCustomerArea.value = curlCommand;
}

//Assign CPB to Customer Account JSON
function updateAssignCustomerAccountJSON(priceBookAssignmentId) {
  const cxAPIIdInput = document.getElementById('cxAPIId').value.trim();
  const cxPayerIdInput = document.getElementById('cxPayerId').value.trim();

  const clientAPIId = cxAPIIdInput !== '' ? cxAPIIdInput : '<Enter ClientAPI ID>';

  //Split billing_account_owner_id by commas, trim each, filter empty values
  let billingAccountOwnerIdArray = [];

  if (cxPayerIdInput === '') {
    billingAccountOwnerIdArray = ["ALL"];
  } else {
    billingAccountOwnerIdArray = cxPayerIdInput
      .split(',')
      .map(id => id.trim())
      .filter(id => id !== '');
  }

  const jsonContent = {
    price_book_assignment_id: priceBookAssignmentId,
    billing_account_owner_id: billingAccountOwnerIdArray,
    target_client_api_id: clientAPIId
  };

  const assignCustomerAccountArea = document.getElementById('assignCustomerAccountJSON');
  assignCustomerAccountArea.value = JSON.stringify(jsonContent, null, 2); // Pretty print JSON
}


//Assign CPB to Customer Account CURL
function updateAssignCustomerAccountCurl(priceBookAssignmentId) {
  const cxAPIIdInput = document.getElementById('cxAPIId').value.trim();
  const cxPayerIdInput = document.getElementById('cxPayerId').value.trim();

  const clientAPIId = cxAPIIdInput !== '' ? cxAPIIdInput : '<Enter ClientAPI ID>';

  let billingAccountOwnerIdArray = [];

  if (cxPayerIdInput === '') {
    billingAccountOwnerIdArray = ["ALL"];
  } else {
    billingAccountOwnerIdArray = cxPayerIdInput
      .split(',')
      .map(id => id.trim())
      .filter(id => id !== '');
  }

  const billingAccountOwnerIdJSON = JSON.stringify(billingAccountOwnerIdArray);

  const curlCommand = `curl -X POST https://chapi.cloudhealthtech.com/v1/price_book_account_assignments \\
  -H "Authorization: Bearer <YOUR_API_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "price_book_assignment_id": "${priceBookAssignmentId}",
    "billing_account_owner_id": ${billingAccountOwnerIdJSON},
    "target_client_api_id": "${clientAPIId}"
}'`;

  const assignCustomerAccountArea = document.getElementById('assignCustomerAccountJSON');
  assignCustomerAccountArea.value = curlCommand;
}

    //import file function

    document.getElementById('importButton').addEventListener('click', function () {
      document.getElementById('importFile').click();
    });

document.getElementById('importFile').addEventListener('change', function (event) {
  document.getElementById('outputXML').value = '';
  document.getElementById('outputJSON').value = '';
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const result = e.target.result;

      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        let jsonContent = null;
        let xmlString = null;

        try {
          // First attempt normal JSON parsing
          jsonContent = JSON.parse(result);
          xmlString = jsonContent.specification;
        } catch (err) {
          console.warn('Standard JSON.parse failed. Attempting to extract XML manually...');

          // Manual fallback: extract "book_name" and "specification" manually
          const bookNameMatch = result.match(/"book_name"\s*:\s*"([^"]*)"/);
          const specStart = result.indexOf('"specification"');
          const specColon = result.indexOf(':', specStart);
          const specQuoteStart = result.indexOf('"', specColon + 1);

          if (specStart !== -1 && specColon !== -1 && specQuoteStart !== -1) {
            let specContent = result.substring(specQuoteStart + 1);

            // Find last closing quote safely (ignore any escaped quotes)
            let specQuoteEnd = specContent.lastIndexOf('"');
            while (specContent[specQuoteEnd - 1] === '\\') {
              // If the quote is escaped, keep looking left
              specQuoteEnd = specContent.lastIndexOf('"', specQuoteEnd - 2);
            }

            specContent = specContent.substring(0, specQuoteEnd);

            // Unescape backslash-escaped characters
            xmlString = specContent
              .replace(/\\"/g, '"')
              .replace(/\\n/g, '\n')
              .replace(/\\t/g, '\t')
              .replace(/\\\\/g, '\\');

            jsonContent = {
              book_name: bookNameMatch ? bookNameMatch[1] : 'Unknown'
            };
          } else {
            alert('Failed to extract XML from malformed JSON.');
            return;
          }
        }

        if (xmlString) {
          populateFieldsFromXMLString(xmlString, jsonContent);
        } else {
          alert('Could not find specification data.');
        }

      } else if (file.type === 'text/xml' || file.name.endsWith('.xml')) {
        populateFieldsFromXMLString(result);
      } else {
        alert('Unsupported file format. Please upload a JSON or XML file.');
      }
    };

    reader.readAsText(file);
  }
});

    function populateFieldsFromXMLString(xmlString, jsonContent = null) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

      const bookNameValue = jsonContent ? jsonContent.book_name : '';
      document.getElementById('bookName').value = bookNameValue;

      const createdByValue = jsonContent ? jsonContent.createdBy : xmlDoc.documentElement.getAttribute('createdBy');
      document.getElementById('createdBy').value = createdByValue || '';

      const comment = xmlDoc.querySelector('Comment')?.textContent || '';
      document.getElementById('comment').value = comment;

      document.getElementById('groupsContainer').innerHTML = '';

      const ruleGroups = xmlDoc.getElementsByTagName('RuleGroup');
      Array.from(ruleGroups).forEach(ruleGroup => {
        addRuleGroup();
        const currentGroup = document.querySelector('.ruleGroup:last-child');

        currentGroup.querySelector('.startDate').value = ruleGroup.getAttribute('startDate');
        currentGroup.querySelector('.endDate').value = ruleGroup.getAttribute('endDate');
        currentGroup.querySelector('.enabled').value = ruleGroup.getAttribute('enabled') || 'true';

        const billingRules = ruleGroup.getElementsByTagName('BillingRule');
        Array.from(billingRules).forEach(billingRule => {
          addRule(currentGroup.querySelector('button'));
          const currentRule = currentGroup.querySelector('.rule:last-child');

          currentRule.querySelector('.ruleName').value = billingRule.getAttribute('name');
          currentRule.querySelector('.billingAdjustment').value = billingRule.getElementsByTagName('BasicBillingRule')[0].getAttribute('billingAdjustment');
          currentRule.querySelector('.billingRuleType').value = billingRule.getElementsByTagName('BasicBillingRule')[0].getAttribute('billingRuleType');
          currentRule.querySelector('.includeDataTransfer').value = billingRule.getAttribute('includeDataTransfer');
          currentRule.querySelector('.includeRIPurchases').value = billingRule.getAttribute('includeRIPurchases');

          const product = billingRule.getElementsByTagName('Product')[0];
          if (product) {
            currentRule.querySelector('.productName').value = product.getAttribute('productName');
            currentRule.querySelector('.productIncludeDataTransfer').value = product.getAttribute('includeDataTransfer');
            currentRule.querySelector('.productIncludeRIPurchases').value = product.getAttribute('includeRIPurchases');

            const region = product.getElementsByTagName('Region')[0];
            if (region) {
              currentRule.querySelector('.region').value = region.getAttribute('name');
            }

            populateSubEntries(currentRule.querySelector('.usageTypes'), product.getElementsByTagName('UsageType'), 'name', addUsageType);
            populateSubEntries(currentRule.querySelector('.operations'), product.getElementsByTagName('Operation'), 'name', addOperation);
            populateSubEntries(currentRule.querySelector('.recordTypes'), product.getElementsByTagName('RecordType'), 'name', addRecordType);

            Array.from(product.getElementsByTagName('InstanceProperties')).forEach(instanceProperty => {
              addInstanceProperty(currentRule.querySelector('.instanceProperties + .sub-entry button'));
              const newInstance = currentRule.querySelector('.instanceProperties .sub-entry:last-child');
              newInstance.querySelector('.instanceType').value = instanceProperty.getAttribute('instanceType');
              newInstance.querySelector('.instanceSize').value = instanceProperty.getAttribute('instanceSize');
              const reservedAttr = instanceProperty.getAttribute('reserved');
              newInstance.querySelector('.reservedInstance').checked = reservedAttr === 'true';
            });

            Array.from(product.getElementsByTagName('LineItemDescription')).forEach(lineItem => {
              addLineItemDescription(currentRule.querySelector('.lineItemDescriptions + .sub-entry button'));
              const newDescription = currentRule.querySelector('.lineItemDescriptions .sub-entry:last-child');
              ['contains', 'startsWith', 'matchesRegex'].forEach(type => {
                if (lineItem.getAttribute(type)) {
                  newDescription.querySelector('.lineItemType').value = type;
                  newDescription.querySelector('.lineItemValue').value = lineItem.getAttribute(type);
                }
              });
            });

            populateSubEntries(currentRule.querySelector('.savingsPlanOfferingTypes'), product.getElementsByTagName('SavingsPlanOfferingType'), 'name', addSavingsPlanOfferingType);
          }
        });
      });
    }

    function populateSubEntries(container, xmlElements, attrName, addFunction, specificAttrs = []) {
      Array.from(xmlElements).forEach(element => {
        const button = container.nextElementSibling.querySelector('button');
        addFunction(button);
        const newEntry = container.querySelector('.sub-entry:last-child');
        if (attrName) {
          newEntry.querySelector('input').value = element.getAttribute(attrName) || '';
        } else if (specificAttrs.length) {
          specificAttrs.forEach(attr => {
            const input = newEntry.querySelector(`.${attr}`);
            if (attr === 'reserved') {
              input.checked = element.getAttribute(attr) === 'true';
            } else {
              input.value = element.getAttribute(attr) || '';
            }
          });
        }
      });
    }

    //copy to clipBoard function

    function copyToClipboard(textareaId) {
      const textarea = document.getElementById(textareaId);
      textarea.select();
      textarea.setSelectionRange(0, 99999); // For mobile
      document.execCommand("copy");
    }
//Download output
function downloadText(textareaId, extension) {
  const text = document.getElementById(textareaId).value;
  const nameInput = document.getElementById('bookName');
  let base = nameInput ? nameInput.value.trim() : 'output';
  if (!base) base = 'output';

  // Sanitize filename
  base = base.replace(/[^\w\-]/g, '_');

  // Add date timestamp
  const now = new Date();
  const timestamp = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const filename = `${base}_${timestamp}.${extension}`;

  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
    //info button
    document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('infoButton').classList.add('small-button');

      document.getElementById('infoButton').addEventListener('click', function () {
        var infoModal = document.getElementById('infoModal');
        infoModal.style.display = 'block';
        document.getElementById('infoContent').innerHTML = `
        <p><strong>Rule Order:</strong> Custom price book XML specifications process rules in top-down order. The first applicable rule that satisfies all specified constraints for a line item is used, and then no subsequent rules are used for that line item. If no applicable and matching rule is found, the line item will have a 0% calculated price adjustment.</p>
        <p><strong>Rule Applicability:</strong> Rule applicability is determined by the startDate and endDate attributes in enabled RuleGroup elements. startDates and endDates are inclusive. Whether or not an applicable rule is actually used depends on its order relative to other rules and the constraints it specifies for matching line items.</p>
        <p><strong>For more details:</strong> <a href="https://apidocs.cloudhealthtech.com/#price-book_introduction-to-price-book-api" target="_blank" style="color: #4ca1af;">API Documentation</a></p>
      `;
      });

      window.closeModal = function () {
        document.getElementById('infoModal').style.display = 'none';
      };
    });

console.log('updated addRule and other functions');
")
