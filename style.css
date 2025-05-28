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
                        document.getElementById('xmlOutput').value = output;
                        break;
                    case 'json':
                        output = generateJSON();
                        document.getElementById('jsonOutput').value = output;
                        break;
                    case 'curl':
                        output = generateCURL();
                        document.getElementById('jsonOutput').value = output;
                        break;
                }

                hideLoadingIndicator();
            }, 500);
        }

        function generateXML() {
            return `<?xml version="1.0" encoding="UTF-8"?>\n<CHTBillingRules>\n    <!-- XML content would be generated here -->\n</CHTBillingRules>`;
        }

        function generateJSON() {
            return JSON.stringify({
                book_name: document.getElementById('bookName').value,
                created_by: document.getElementById('createdBy').value,
                // Other fields would be included here
            }, null, 2);
        }

        function generateCURL() {
            const jsonPayload = generateJSON();
            return `curl -X POST https://chapi.cloudhealthtech.com/v1/price_books \\\n  -H "Authorization: Bearer <YOUR_API_KEY>" \\\n  -H "Content-Type: application/json" \\\n  -d '${jsonPayload}'`;
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
                <p><strong>Rule Order:</strong> Rules are processed top-down. The first applicable rule is used.</p>
                <p><strong>Rule Applicability:</strong> Determined by start and end dates in enabled rule groups.</p>
                <p><strong>More Info:</strong> <a href="https://apidocs.cloudhealthtech.com/#price-book_introduction-to-price-book-api" target="_blank" rel="noopener noreferrer">API Documentation</a></p>
            `;
            modal.style.display = 'block';
        });

        function closeModal() {
            document.getElementById('helpModal').style.display = 'none';
        }

        document.getElementById('importButton').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const content = e.target.result;
                        if (file.name.endsWith('.json')) {
                            const jsonData = JSON.parse(content);
                            populateFormFromJSON(jsonData);
                        } else if (file.name.endsWith('.xml')) {
                            populateFormFromXML(content);
                        }
                    } catch (error) {
                        console.error('Error parsing file:', error);
                        alert('Error parsing the file. Please ensure it\'s a valid JSON or XML file.');
                    }
                };
                reader.readAsText(file);
            }
        });

        function populateFormFromJSON(data) {
            document.getElementById('bookName').value = data.book_name || '';
            document.getElementById('createdBy').value = data.created_by || '';
            // Add logic to populate other fields and create rule groups
        }

        function populateFormFromXML(xmlString) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            // Add logic to extract data from XML and populate the form
        }

        document.addEventListener('DOMContentLoaded', () => {
            addRuleGroup(null, true); // Add an initial rule group
        });
