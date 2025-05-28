            document.addEventListener('DOMContentLoaded', function () {
                // Check if system is in dark mode
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                // Set initial theme based on system preference
                if (prefersDark) {
                    document.body.setAttribute('data-theme', 'dark');
                }

                // Listen for system theme changes
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                    if (e.matches) {
                        document.body.setAttribute('data-theme', 'dark');
                    } else {
                        document.body.removeAttribute('data-theme');
                    }
                });
            });
            function toggleTheme() {
                const body = document.body;
                const currentTheme = body.getAttribute('data-theme');
                if (currentTheme === 'dark') {
                    body.removeAttribute('data-theme');
                } else {
                    body.setAttribute('data-theme', 'dark');
                }
            }
            function validateForm() {
                let isValid = true;
                const requiredFields = ['bookName', 'createdBy'];

                requiredFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    const errorElement = document.getElementById(`${fieldId}-error`);

                    if (!field.value.trim()) {
                        isValid = false;
                        field.setAttribute('aria-invalid', 'true');
                        errorElement.textContent = 'This field is required.';
                    } else {
                        field.removeAttribute('aria-invalid');
                        errorElement.textContent = '';
                    }
                });

                return isValid;
            }

            function addRuleGroup(afterElement = null, insertAtTop = false) {
                const div = document.createElement('div');
                div.className = 'rule-group';
                div.innerHTML = `
                <h3>Rule Group</h3>
                <div class="input-row">
                    <div class="input-group">
                        <label for="startDate-${Date.now()}">Start Date</label>
                        <input type="date" id="startDate-${Date.now()}" required>
                    </div>
                    <div class="input-group">
                        <label for="endDate-${Date.now()}">End Date (Optional)</label>
                        <input type="date" id="endDate-${Date.now()}">
                    </div>
                    <div class="input-group">
                        <label for="enabled-${Date.now()}">Enabled</label>
                        <select id="enabled-${Date.now()}">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <div class="rules"></div>
                <div class="button-group">
                    <button onclick="addRule(this)" class="button">
                        <span class="button-icon">➕</span>Add Billing Rule
                    </button>
                    <button onclick="addRuleGroup(this.closest('.rule-group'))" class="button">
                        <span class="button-icon">➕</span>Add Rule Group
                    </button>
                    <button class="button button-red" onclick="this.closest('.rule-group').remove()">
                        <span class="button-icon">×</span>Remove Rule Group
                    </button>
                </div>
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

            function addRule(button) {
                const rulesContainer = button.closest('.rule-group').querySelector('.rules');
                const div = document.createElement('div');
                div.className = 'rule';
                div.innerHTML = `
                <div class="input-group">
                    <label>Billing Rule Name</label>
                    <input type="text" class="ruleName" placeholder="Enter Billing Rule name" />
                </div>
                <div class="billing-rule-inline">
                    <div class="input-group">
                        <label>Billing Adjustment</label>
                        <input type="number" class="billingAdjustment" placeholder="e.g. 0.00"/>
                    </div>
                    <div class="input-group">
                        <label>Billing Rule Type</label>
                        <select class="billingRuleType">
                            <option value="percentDiscount">percentDiscount</option>
                            <option value="percentIncrease">percentIncrease</option>
                            <option value="fixedRate">fixedRate</option>
                        </select>
                    </div>
                    <div class="input-group compact">
                        <label>Include Data Transfer</label>
                        <select class="includeDataTransfer">
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                    <div class="input-group compact">
                        <label>Include RI Purchases</label>
                        <select class="includeRIPurchases">
                            <option value="true">true</option>
                            <option value="false" selected>false</option>
                        </select>
                    </div>
                </div>
                <div class="product-inline">
                    <div class="input-group">
                        <label>Product Name</label>
                        <input type="text" class="productName" list="productList" placeholder="Leave empty for Any Products" />
                        <datalist id="productList">
                            <option value="Amazon API Gateway" />
                            <option value="Amazon AppFlow" />
                            <option value="Savings Plans for AWS Machine Learning" />
                        </datalist>
                    </div>
                    <div class="input-group compact">
                        <label>Product Include Data Transfer</label>
                        <select class="productIncludeDataTransfer">
                            <option value="">(inherit)</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                    <div class="input-group compact">
                        <label>Product Include RI Purchases</label>
                        <select class="productIncludeRIPurchases">
                            <option value="">(inherit)</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                </div>
                <div class="input-group">
                    <label>Region (optional)</label>
                    <input type="text" class="region" />
                </div>
                <div class="sub-group">
                    <label>Usage Types</label>
                    <div class="usageTypes"></div>
                    <button class="button" type="button" onclick="addUsageType(this)">Add Usage Type</button>
                </div>
                <div class="sub-group">
                    <label>Operations</label>
                    <div class="operations"></div>
                    <button class="button" type="button" onclick="addOperation(this)">Add Operation</button>
                </div>
                <div class="sub-group">
                    <label>Record Types</label>
                    <div class="recordTypes"></div>
                    <button class="button" type="button" onclick="addRecordType(this)">Add Record Type</button>
                </div>
                <div class="sub-group">
                    <label>Instance Properties</label>
                    <div class="instanceProperties"></div>
                    <button class="button" type="button" onclick="addInstanceProperty(this)">Add Instance Property</button>
                </div>
                <div class="sub-group">
                    <label>Line Item Descriptions</label>
                    <div class="lineItemDescriptions"></div>
                    <button class="button" type="button" onclick="addLineItemDescription(this)">Add Line Item</button>
                </div>
                <div class="sub-group">
                    <label>Savings Plan Offering Types</label>
                    <div class="savingsPlanOfferingTypes"></div>
                    <button class="button" type="button" onclick="addSavingsPlanOfferingType(this)">Add Savings Plan Offering Type</button>
                </div>
                <button class="button button-red" onclick="this.closest('.rule').remove()">
                    <span class="button-icon">×</span>Remove Billing Rule
                </button>
            `;
                rulesContainer.appendChild(div);
            }

            function addUsageType(button) {
                const container = button.closest('.sub-group').querySelector('.usageTypes');
                const div = document.createElement('div');
                div.className = 'sub-entry';
                div.innerHTML = `
                <button type="button" class="small-button" onclick="this.parentElement.remove()">×</button>
                <input type="text" class="usageTypeName" placeholder="UsageType name..." />
            `;
                container.appendChild(div);
            }

            function addLineItemDescription(button) {
                const container = button.closest('.sub-group').querySelector('.lineItemDescriptions');
                const div = document.createElement('div');
                div.className = 'sub-entry with-select';
                div.innerHTML = `
                <button type="button" class="small-button" onclick="this.parentElement.remove()">×</button>
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
                <button type="button" class="small-button" onclick="this.parentElement.remove()">×</button>
                <input type="text" class="operationName" placeholder="Enter Operation name..." />
            `;
                container.appendChild(div);
            }

            function addRecordType(button) {
                const container = button.closest('.sub-group').querySelector('.recordTypes');
                const div = document.createElement('div');
                div.className = 'sub-entry';
                div.innerHTML = `
                <button type="button" class="small-button" onclick="this.parentElement.remove()">×</button>
                <input type="text" class="recordTypeName" placeholder="Enter RecordType..." />
            `;
                container.appendChild(div);
            }

            function addInstanceProperty(button) {
                const container = button.closest('.sub-group').querySelector('.instanceProperties');
                const div = document.createElement('div');
                div.className = 'sub-entry with-double-input';
                div.innerHTML = `
                <button type="button" class="small-button" onclick="this.parentElement.remove()">×</button>
                <input type="text" class="instanceType" placeholder="Instance Type (e.g., t2)" />
                <input type="text" class="instanceSize" placeholder="Instance Size (e.g., 8xlarge)" />
                <div class="checkbox-wrapper">
                    <input type="checkbox" class="reservedInstance" id="reservedInstance-${Date.now()}" />
                    <label for="reservedInstance-${Date.now()}" class="checkbox-label">Reserved</label>
                </div>
            `;
                container.appendChild(div);
            }

            function addSavingsPlanOfferingType(button) {
                const container = button.closest('.sub-group').querySelector('.savingsPlanOfferingTypes');
                const div = document.createElement('div');
                div.className = 'sub-entry';
                div.innerHTML = `
                <button type="button" class="small-button" onclick="this.parentElement.remove()">×</button>
                <input type="text" class="savingsPlanOfferingTypeName" placeholder="Enter Savings Plan Offering Type..." />
            `;
                container.appendChild(div);
            }

            function generateOutput(type) {
                if (!validateForm()) {
                    return;
                }

                showLoadingIndicator();

                setTimeout(() => {
                    let output = '';
                    switch (type) {
                        case 'xml':
                            output = generateXML();
                            if (output) {
                                document.getElementById('xmlOutput').value = output;
                            }
                            break;
                        case 'json':
                            output = generateJSON();
                            if (output) {
                                document.getElementById('jsonOutput').value = output;
                                // Add calls to update the assignment JSONs
                                updateAssignCustomerJSON('<PriceBookID_From_Previous_Command_Output>');
                                updateAssignCustomerAccountJSON('<PriceBookAssignmentID_From_Previous_Command_Output>');
                            }
                            break;
                        case 'curl':
                            output = generateCURL();
                            if (output) {
                                document.getElementById('jsonOutput').value = output;
                                // Add calls to update the assignment CURLs
                                updateAssignCustomerCurl('<PriceBookID_From_Previous_Command_Output>');
                                updateAssignCustomerAccountCurl('<PriceBookAssignmentID_From_Previous_Command_Output>');
                            }
                            break;
                    }

                    hideLoadingIndicator();
                }, 500);
            }

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

                const groups = document.querySelectorAll('.rule-group');
                let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<CHTBillingRules createdBy="${createdBy}" date="${new Date().toISOString().split('T')[0]}">\n\t<Comment>${comment}</Comment>\n`;

                groups.forEach(group => {
                    let startDate = group.querySelector('[id^="startDate-"]').value;
                    if (!startDate) {
                        const now = new Date();
                        startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
                    }
                    const endDate = group.querySelector('[id^="endDate-"]').value;
                    const enabled = group.querySelector('[id^="enabled-"]').value;

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
                return xml;
            }

            function generateJSON() {
                const bookNameInput = document.getElementById('bookName');
                const bookName = bookNameInput.value.trim();

                if (!bookName) {
                    alert("Price Book Name is required.");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    bookNameInput.style.border = '2px solid red';
                    bookNameInput.focus();
                    return;
                }

                const xml = generateXML();
                if (!xml) {
                    alert("Failed to generate XML.");
                    return;
                }

                const escapedXML = xml.replace(/"/g, '\\"');
                return `{"book_name":"${bookName}","specification":"${escapedXML}"}`;
            }

            function generateCURL() {
                const jsonPayload = generateJSON();
                if (!jsonPayload) return;

                return `curl -X POST https://chapi.cloudhealthtech.com/v1/price_books \\\n` +
                    `  -H "Authorization: Bearer <YOUR_API_TOKEN>" \\\n` +
                    `  -H "Content-Type: application/json" \\\n` +
                    `  -d '${jsonPayload}'`;
            }
            function updateAssignCustomerJSON(priceBookId) {
                const cxAPIIdInput = document.getElementById('cxAPIId').value.trim();
                const clientAPIId = cxAPIIdInput !== '' ? cxAPIIdInput : '<Enter ClientAPI ID>';

                const payload = {
                    price_book_id: priceBookId,
                    target_client_api_id: clientAPIId
                };

                document.getElementById('assignCustomerJSON').value = JSON.stringify(payload, null, 2);
            }

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

                document.getElementById('assignCustomerJSON').value = curlCommand;
            }

            function updateAssignCustomerAccountJSON(priceBookAssignmentId) {
                const cxAPIIdInput = document.getElementById('cxAPIId').value.trim();
                const cxPayerIdInput = document.getElementById('cxPayerId').value.trim();
                const clientAPIId = cxAPIIdInput !== '' ? cxAPIIdInput : '<Enter ClientAPI ID>';

                let billingAccountOwnerIdArray = cxPayerIdInput === ''
                    ? ["ALL"]
                    : cxPayerIdInput.split(',').map(id => id.trim()).filter(id => id !== '');

                const jsonContent = {
                    price_book_assignment_id: priceBookAssignmentId,
                    billing_account_owner_id: billingAccountOwnerIdArray,
                    target_client_api_id: clientAPIId
                };

                document.getElementById('assignCustomerAccountJSON').value = JSON.stringify(jsonContent, null, 2);
            }

            function updateAssignCustomerAccountCurl(priceBookAssignmentId) {
                const cxAPIIdInput = document.getElementById('cxAPIId').value.trim();
                const cxPayerIdInput = document.getElementById('cxPayerId').value.trim();
                const clientAPIId = cxAPIIdInput !== '' ? cxAPIIdInput : '<Enter ClientAPI ID>';

                let billingAccountOwnerIdArray = cxPayerIdInput === ''
                    ? ["ALL"]
                    : cxPayerIdInput.split(',').map(id => id.trim()).filter(id => id !== '');

                const billingAccountOwnerIdJSON = JSON.stringify(billingAccountOwnerIdArray);

                const curlCommand = `curl -X POST https://chapi.cloudhealthtech.com/v1/price_book_account_assignments \\
  -H "Authorization: Bearer <YOUR_API_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "price_book_assignment_id": "${priceBookAssignmentId}",
    "billing_account_owner_id": ${billingAccountOwnerIdJSON},
    "target_client_api_id": "${clientAPIId}"
  }'`;

                document.getElementById('assignCustomerAccountJSON').value = curlCommand;
            }

            function copyOutput(elementId) {
                const outputElement = document.getElementById(elementId);
                outputElement.select();
                document.execCommand('copy');
                alert('Copied to clipboard!');
            }

            function downloadOutput(elementId, fileType) {
                const content = document.getElementById(elementId).value;
                const filename = `price_book_${new Date().toISOString().split('T')[0]}.${fileType}`;
                const blob = new Blob([content], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            }

            function showLoadingIndicator() {
                document.querySelector('.loading-indicator').classList.add('active');
            }

            function hideLoadingIndicator() {
                document.querySelector('.loading-indicator').classList.remove('active');
            }

            document.getElementById('helpButton').addEventListener('click', () => {
                const modal = document.getElementById('helpModal');
                const content = document.getElementById('helpContent');
                content.innerHTML = `
        <p><strong>Rule Order:</strong> Custom price book XML specifications process rules in top-down order. The first applicable rule that satisfies all specified constraints for a line item is used, and then no subsequent rules are used for that line item. If no applicable and matching rule is found, the line item will have a 0% calculated price adjustment.</p>
        <p><strong>Rule Applicability:</strong> Rule applicability is determined by the startDate and endDate attributes in enabled RuleGroup elements. startDates and endDates are inclusive. Whether or not an applicable rule is actually used depends on its order relative to other rules and the constraints it specifies for matching line items.</p>
        <p><strong>For more details:</strong> <a href="https://apidocs.cloudhealthtech.com/#price-book_introduction-to-price-book-api" target="_blank" style="color: #4ca1af;">API Documentation</a></p>
      `;
                modal.style.display = 'block';
            });

            function closeModal() {
                document.getElementById('helpModal').style.display = 'none';
            }

            document.getElementById('importButton').addEventListener('click', function () {
                const mainFields = ['bookName', 'createdBy', 'comment', 'cxAPIId', 'cxPayerId'];
                const allFieldsEmpty = mainFields.every(fieldId => document.getElementById(fieldId).value.trim() === '');
                const noRuleGroups = document.getElementById('groupsContainer').children.length === 0;

                if (allFieldsEmpty && noRuleGroups) {
                    // If all fields are empty and there are no rule groups, import without prompting
                    document.getElementById('fileInput').click();
                } else {
                    // If there's data, prompt for confirmation
                    if (confirm('Importing a price book will clear the existing data in the form. Do you want to continue?')) {
                        document.getElementById('fileInput').click();
                    }
                }
            });

            document.getElementById('fileInput').addEventListener('change', function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const result = e.target.result;

                        // Reset all fields and clear all rule groups before import
                        performReset();

                        if (file.type === 'application/json' || file.name.endsWith('.json')) {
                            handleJSONImport(result);
                        } else if (file.type === 'text/xml' || file.name.endsWith('.xml')) {
                            handleXMLImport(result);
                        } else {
                            alert('Unsupported file format. Please upload a JSON or XML file.');
                        }
                    };

                    reader.readAsText(file);
                }
            });

            function resetAllFields() {
                // Clear main fields
                document.getElementById('bookName').value = '';
                document.getElementById('createdBy').value = '';
                document.getElementById('comment').value = '';
                document.getElementById('cxAPIId').value = '';
                document.getElementById('cxPayerId').value = '';

                // Clear all rule groups
                document.getElementById('groupsContainer').innerHTML = '';

                // Clear all output areas
                document.getElementById('xmlOutput').value = '';
                document.getElementById('jsonOutput').value = '';
                document.getElementById('assignCustomerJSON').value = '';
                document.getElementById('assignCustomerAccountJSON').value = '';

                // Remove any error styling
                document.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
                document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            }

            function handleJSONImport(result) {
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
            }

            function handleXMLImport(result) {
                populateFieldsFromXMLString(result);
            }

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
                    const currentGroup = document.querySelector('.rule-group:last-child');

                    currentGroup.querySelector('[id^="startDate-"]').value = ruleGroup.getAttribute('startDate');
                    currentGroup.querySelector('[id^="endDate-"]').value = ruleGroup.getAttribute('endDate');
                    currentGroup.querySelector('[id^="enabled-"]').value = ruleGroup.getAttribute('enabled') || 'true';

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
                                addInstanceProperty(currentRule.querySelector('.instanceProperties').nextElementSibling);
                                const newInstance = currentRule.querySelector('.instanceProperties .sub-entry:last-child');
                                newInstance.querySelector('.instanceType').value = instanceProperty.getAttribute('instanceType');
                                newInstance.querySelector('.instanceSize').value = instanceProperty.getAttribute('instanceSize');
                                const reservedAttr = instanceProperty.getAttribute('reserved');
                                newInstance.querySelector('.reservedInstance').checked = reservedAttr === 'true';
                            });

                            Array.from(product.getElementsByTagName('LineItemDescription')).forEach(lineItem => {
                                addLineItemDescription(currentRule.querySelector('.lineItemDescriptions').nextElementSibling);
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
                    const button = container.nextElementSibling;
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

            document.addEventListener('DOMContentLoaded', () => {
                addRuleGroup(null, true); // Add an initial rule group
            });

            //Rest all fields.
            function resetAllFields() {
                // Check if all main fields are empty
                const mainFields = ['bookName', 'createdBy', 'comment', 'cxAPIId', 'cxPayerId'];
                const allFieldsEmpty = mainFields.every(fieldId => document.getElementById(fieldId).value.trim() === '');
                const noRuleGroups = document.getElementById('groupsContainer').children.length === 0;

                if (allFieldsEmpty && noRuleGroups) {
                    // If all fields are empty and there are no rule groups, reset without prompting
                    performReset();
                } else {
                    // If there's data, prompt for confirmation
                    if (confirm('Are you sure you want to reset all fields? This action cannot be undone.')) {
                        performReset();
                    }
                }
            }

            function performReset() {
                // Clear main fields
                ['bookName', 'createdBy', 'comment', 'cxAPIId', 'cxPayerId'].forEach(fieldId => {
                    document.getElementById(fieldId).value = '';
                });

                // Clear all rule groups
                document.getElementById('groupsContainer').innerHTML = '';

                // Clear all output areas
                ['xmlOutput', 'jsonOutput', 'assignCustomerJSON', 'assignCustomerAccountJSON'].forEach(fieldId => {
                    document.getElementById(fieldId).value = '';
                });

                // Remove any error styling
                document.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
                document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

                // Add initial rule group
                addRuleGroup(null, true);
            }
