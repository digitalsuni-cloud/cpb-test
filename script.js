document.addEventListener('DOMContentLoaded', function () {
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

function addRuleGroup(afterElement = null, insertAtTop = false) {
    const div = document.createElement('div');
    div.className = 'ruleGroup';
    div.innerHTML = `
        <div class="section-title">Rule Group</div>
        <div class="grid-container">
            <div class="grid-item">
                <label>Start Date:</label>
                <input type="date" class="startDate" required />
            </div>
            <div class="grid-item">
                <label>End Date (optional):</label>
                <input type="date" class="endDate" />
            </div>
            <div class="grid-item">
                <label>Enabled:</label>
                <select class="enabled">
                    <option value="true" selected>true</option>
                    <option value="false">false</option>
                </select>
            </div>
            <div class="grid-item">
                <label>Billing Rule Name:</label>
                <input type="text" class="ruleName" placeholder="Enter Billing Rule name" />
            </div>
            <div class="grid-item">
                <label>Billing Adjustment:</label>
                <input type="number" class="billingAdjustment" placeholder="e.g. 0.00"/>
            </div>
            <div class="grid-item">
                <label>Billing Rule Type:</label>
                <select class="billingRuleType">
                    <option value="percentDiscount">percentDiscount</option>
                    <option value="percentIncrease">percentIncrease</option>
                    <option value="fixedRate">fixedRate</option>
                </select>
            </div>
            <div class="grid-item">
                <label>Include Data Transfer:</label>
                <select class="includeDataTransfer">
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>
            <div class="grid-item">
                <label>Include RI Purchases:</label>
                <select class="includeRIPurchases">
                    <option value="true">true</option>
                    <option value="false" selected>false</option>
                </select>
            </div>
            <div class="grid-item">
                <label>Product Name:</label>
                <input type="text" class="productName" list="productList" placeholder="Leave empty for Any Products" />
            </div>
            <div class="grid-item">
                <label>Product Include Data Transfer:</label>
                <select class="productIncludeDataTransfer">
                    <option value="">(inherit)</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>
            <div class="grid-item">
                <label>Product Include RI Purchases:</label>
                <select class="productIncludeRIPurchases">
                    <option value="">(inherit)</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>
            <div class="grid-item">
                <label>Region (optional):</label>
                <input type="text" class="region" />
            </div>
        </div>
        <div class="rules"></div>
        <div class="sub-group">
            <label>Optional Parameters:</label>
            <select class="optional-parameters" onchange="addOptionalParameter(this)">
                <option value="">Select Parameter</option>
                <option value="usageTypes">Usage Types</option>
                <option value="operations">Operations</option>
                <option value="recordTypes">Record Types</option>
                <option value="instanceProperties">Instance Properties</option>
                <option value="lineItemDescriptions">Line Item Descriptions</option>
                <option value="savingsPlanOfferingTypes">Savings Plan Offering Types</option>
            </select>
            <div class="sub-group usageTypes" style="display: none;">
                <label>Usage Types:</label>
                <div class="usageTypesContainer"></div>
                <div class="sub-entry">
                    <button class="addUsageType add-btn" type="button" onclick="addUsageType(this)">+</button>
                </div>
            </div>
            <div class="sub-group operations" style="display: none;">
                <label>Operations:</label>
                <div class="operationsContainer"></div>
                <div class="sub-entry">
                    <button class="addOperation add-btn" type="button" onclick="addOperation(this)">+</button>
                </div>
            </div>
            <div class="sub-group recordTypes" style="display: none;">
                <label>Record Types:</label>
                <div class="recordTypesContainer"></div>
                <div class="sub-entry">
                    <button class="addRecordType add-btn" type="button" onclick="addRecordType(this)">+</button>
                </div>
            </div>
            <div class="sub-group instanceProperties" style="display: none;">
                <label>Instance Properties:</label>
                <div class="instancePropertiesContainer"></div>
                <div class="sub-entry">
                    <button class="addInstanceProperty add-btn" type="button" onclick="addInstanceProperty(this)">+</button>
                </div>
            </div>
            <div class="sub-group lineItemDescriptions" style="display: none;">
                <label>Line Item Descriptions:</label>
                <div class="lineItemDescriptionsContainer"></div>
                <div class="sub-entry">
                    <button class="addLineItem add-btn" type="button" onclick="addLineItemDescription(this)">+</button>
                </div>
            </div>
            <div class="sub-group savingsPlanOfferingTypes" style="display: none;">
                <label>Savings Plan Offering Types:</label>
                <div class="savingsPlanOfferingTypesContainer"></div>
                <div class="sub-entry">
                    <button class="addSavingsPlanOfferingType add-btn" type="button" onclick="addSavingsPlanOfferingType(this)">+</button>
                </div>
            </div>
        </div>
        <button class="remove-rule-btn" onclick="this.parentElement.remove()">Remove Billing Rule</button>
    `;
    rulesContainer.appendChild(div);
}

function addOptionalParameter(selectElement) {
    const value = selectElement.value;
    if (value) {
        const container = selectElement.closest('.ruleGroup').querySelector(`.${value}`);
        container.style.display = 'block';
        selectElement.value = ''; // Reset dropdown
    }
}

function addUsageType(button) {
    const container = button.closest('.sub-group').querySelector('.usageTypesContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-usagetype" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="usageTypeName" placeholder="UsageType name..." />
    `;
    container.appendChild(div);
}

function addLineItemDescription(button) {
    const container = button.closest('.sub-group').querySelector('.lineItemDescriptionsContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
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
    const container = button.closest('.sub-group').querySelector('.operationsContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="operationName" placeholder="Enter Operation name..." />
    `;
    container.appendChild(div);
}

function addRecordType(button) {
    const container = button.closest('.sub-group').querySelector('.recordTypesContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="recordTypeName" placeholder="Enter RecordType..." />
    `;
    container.appendChild(div);
}

function addInstanceProperty(button) {
    const container = button.closest('.sub-group').querySelector('.instancePropertiesContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
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
    const container = button.closest('.sub-group').querySelector('.savingsPlanOfferingTypesContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="savingsPlanOfferingTypeName" placeholder="Enter Savings Plan Offering Type..." />
    `;
    container.appendChild(div);
}

// Copy to Clipboard Function
function copyToClipboard(textareaId) {
    const textarea = document.getElementById(textareaId);
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

// Download Output
function downloadText(textareaId, extension) {
    const text = document.getElementById(textareaId).value;
    const nameInput = document.getElementById('bookName');
    let base = nameInput ? nameInput.value.trim() : 'output';
    if (!base) base = 'output';

    base = base.replace(/[^\w\-]/g, '_');

    const now = new Date();
    const timestamp = now.toISOString().split('T')[0];
    const filename = `${base}_${timestamp}.${extension}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
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

                populateSubEntries(currentRule.querySelector('.usageTypesContainer'), product.getElementsByTagName('UsageType'), 'name', addUsageType);
                populateSubEntries(currentRule.querySelector('.operationsContainer'), product.getElementsByTagName('Operation'), 'name', addOperation);
                populateSubEntries(currentRule.querySelector('.recordTypesContainer'), product.getElementsByTagName('RecordType'), 'name', addRecordType);

                Array.from(product.getElementsByTagName('InstanceProperties')).forEach(instanceProperty => {
                    addInstanceProperty(currentRule.querySelector('.instancePropertiesContainer + .sub-entry button'));
                    const newInstance = currentRule.querySelector('.instancePropertiesContainer .sub-entry:last-child');
                    newInstance.querySelector('.instanceType').value = instanceProperty.getAttribute('instanceType');
                    newInstance.querySelector('.instanceSize').value = instanceProperty.getAttribute('instanceSize');
                    const reservedAttr = instanceProperty.getAttribute('reserved');
                    newInstance.querySelector('.reservedInstance').checked = reservedAttr === 'true';
                });

                Array.from(product.getElementsByTagName('LineItemDescription')).forEach(lineItem => {
                    addLineItemDescription(currentRule.querySelector('.lineItemDescriptionsContainer + .sub-entry button'));
                    const newDescription = currentRule.querySelector('.lineItemDescriptionsContainer .sub-entry:last-child');
                    ['contains', 'startsWith', 'matchesRegex'].forEach(type => {
                        if (lineItem.getAttribute(type)) {
                            newDescription.querySelector('.lineItemType').value = type;
                            newDescription.querySelector('.lineItemValue').value = lineItem.getAttribute(type);
                        }
                    });
                });

                populateSubEntries(currentRule.querySelector('.savingsPlanOfferingTypesContainer'), product.getElementsByTagName('SavingsPlanOfferingType'), 'name', addSavingsPlanOfferingType);
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
