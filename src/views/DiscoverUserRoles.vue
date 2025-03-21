<template>
    <div class="user-roles-body-wrapper">
      <div class="user-roles-header-wrapper">
        <div class="header">Users roles found in your product ({{ userRoles.length }})</div>
        <div class="user-roles-header-buttons-wrapper">
          <!-- <div class="add-new-user-role-button" @click="openSidePanel(false)">Add new user role</div>
          <div class="continue-button">Continue</div> -->
          <CustomTooltip position="bottom">
          <template #activator>
            <div class="add-new-user-role-button" @click="openSidePanel(false)">
              Add new user role
            </div>
          </template>
          <template #content>
            <span>You can add a new user role</span>
          </template>
        </CustomTooltip>

        <!-- Continue button with tooltip -->
        <CustomTooltip position="bottom">
          <template #activator>
            <div class="continue-button">
              Continue
            </div>
          </template>
          <template #content>
            <span>Continue to next step</span>
          </template>
        </CustomTooltip>
        </div>
      </div>
      <div class="user-roles-section-wrapper">
        <div class="cards" v-for="role in userRoles" :key="role.id">
          <div class="card-content">
            <!-- Local image from assets or default image -->
            <img :src="role?.image ? appImages[role.image] : appImages['defaultImg.png']" alt="Role Image" class="role-image" />
            <div class="role-name-container">
              <div class="role-name">{{ role.name }}</div>
              <!-- Three dots menu (vertical) -->
              <div class="three-dots-menu" tabindex="0" @click.stop="toggleMenu(role.id)" @blur="closeMenu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="5" r="1.5" fill="black"/>
                    <circle cx="10" cy="12" r="1.5" fill="black"/>
                    <circle cx="10" cy="19" r="1.5" fill="black"/>
                </svg>

                <!-- Popup menu -->
                <div v-if="activeMenu === role.id" class="popup-menu">
                  <div class="popup-item edit" @click="handleEdit(role)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21h18M14 3l7 7-11 11H3v-7L14 3z"/>
                    </svg>
                    Edit
                  </div>
                  <div class="popup-item delete" @click="handleDelete(role.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="black">
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                    Delete
                  </div>
                </div>
              </div>
            </div>
            <div class="role-description">
              {{ role.description }}
            </div>
            <!-- Line below description -->
            <div class="divider"></div>
            <!-- Activities section -->
            <div class="activities-section">
              <div class="activities-heading">Activities</div>
              <div class="activities-list">
                <div v-for="(activity, index) in role.activities" :key="index" class="activity-item">
                  <span class="activity-number">{{ index + 1 }}.</span>
                  <span class="activity-content">{{ activity }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Side Panel -->
      <div v-if="isSidePanelOpen" class="side-panel-overlay" @click="closeSidePanel">
        <div class="side-panel" @click.stop>
          <div class="side-panel-header-wrapper">
            <div class="side-panel-header">{{ isEditing ? 'Edit User Role' : 'Add New User Role' }}</div>
            <!-- <button class="close-button" @click="closeSidePanel">×</button> -->
            <svg @click="closeSidePanel" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="5" x2="19" y2="19" stroke="black" stroke-width="2"/>
                <line x1="19" y1="5" x2="5" y2="19" stroke="black" stroke-width="2"/>
            </svg>

          </div>
          <div class="side-panel-body">
            <form @submit.prevent="saveRole">
              <div class="form-group">
                <label for="role-name">User role info <span class="required">*</span></label>
                <input
                  id="role-name"
                  v-model="newRole.name"
                  type="text"
                  required
                />
              </div>
              <div class="form-group">
                <label for="role-description">One line about this role</label>
                <textarea
                  id="role-description"
                  v-model="newRole.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="role-activities">Activities allowed to this role <span class="required">*</span></label>
                <textarea
                  id="role-activities"
                  v-model="newRole.activitiesInput"
                  :placeholder="isTextareaFocused ? 'Enter activities (one per line)' : ''"
                  required
                  ref="activitiesTextarea"
                  @input="adjustTextareaHeight"
                  @focus="handleTextareaFocus"
                  @blur="handleTextareaBlur"
                ></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="cancel-button" @click="closeSidePanel">Close</button>
                <button type="submit" class="submit-button" :disabled="!isFormValid">{{ isEditing ? 'Update' : 'Save' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BasicPopup v-if="isConfirmationPopupOpen" class="basic-popup-styling" @popupOutsideClick="closeConfirmationPopup">
      <div class="confirmation-popup-content">
        <!-- First Row: "Delete" -->
        <div class="confirmation-row delete-text">Delete</div>

        <!-- Second Row: Confirmation Message -->
        <div class="confirmation-row confirmation-message">
          Are you sure you want to delete <strong>{{ roleToDeleteName }}</strong>?
        </div>

        <!-- Third Row: Buttons (aligned to the right) -->
        <div class="confirmation-row confirmation-buttons">
          <button class="cancel-button" @click="closeConfirmationPopup">Cancel</button>
          <button class="delete-button" @click="confirmDelete">delete</button>
        </div>
      </div>
    </BasicPopup>
    </div>
  </template>

  <script setup>
import { ref, inject, computed, watch, nextTick } from 'vue';
import BasicPopup from "@/components/sharedComponents/BasicPopup.vue";

import CustomTooltip from './vuetifyToolTip.vue';
  const appImages = inject('appImages');
  
  
  // Mock user roles data with activities and images
  const userRoles = ref([
    {
      id: 1,
      name: 'Admin',
      description: 'Administrators are responsible for the overall management and maintenance of the learning platform.',
      activities: [
        'Manage user accounts and permissions.',
        'Monitor system performance and security.',
        'Create and update course content.',
      ],
      image: 'images(1).png', // Example image URL
    },
    {
      id: 2,
      name: 'Editor',
      description: 'Editors are responsible for creating and updating course content.',
      activities: [
        'Edit and publish course materials.',
        'Collaborate with instructors and admins.',
        'Review and approve user-generated content.',
      ],
      image: 'Instructor.png', // Example image URL
    },
    {
      id: 3,
      name: 'Viewer',
      description: 'Viewers have read-only access to the platform.',
      activities: [
        'View course materials and resources.',
        'Access reports and analytics.',
        'Participate in discussions (read-only).',
      ],
      image: 'contentCreator.png', // Example image URL
    },
    {
      id: 4,
      name: 'Guest',
      description: 'Guests have limited access to the platform.',
      activities: [
        'Browse public course materials.',
        'Register for an account to gain full access.',
        'Contact support for assistance.',
      ],
      image: 'student.png', // Example image URL
    },
  ]);
  
  // Side Panel State
  const isSidePanelOpen = ref(false);
  const isEditing = ref(false);
  const activitiesTextarea = ref(null);
  const adjustTextareaHeight = () => {
  nextTick(() => {
    if (activitiesTextarea.value) {
      activitiesTextarea.value.style.height = 'auto'; // Reset height to auto
      activitiesTextarea.value.style.height = `${activitiesTextarea.value.scrollHeight}px`; // Set height to scrollHeight
    }
  });
};
  
  // New Role Form Data
  const newRole = ref({
    id: null,
    name: '',
    description: '',
    activitiesInput: '',
    image: '',
  });
  
  // Track which menu is active
  const activeMenu = ref(null);
  
  // State for the confirmation popup
  const isConfirmationPopupOpen = ref(false);
  const roleToDelete = ref(null); // Track the role to delete
  
  // Computed property to get the name of the role to delete
  const roleToDeleteName = computed(() => {
    const role = userRoles.value.find((role) => role.id === roleToDelete.value);
    return role ? role.name : '';
  });
  
  // Toggle the popup menu
  const toggleMenu = (roleId) => {
    activeMenu.value = activeMenu.value === roleId ? null : roleId;
  };
  
  // Close the popup menu when it loses focus
  const closeMenu = () => {
    activeMenu.value = null;
  };
  
  // Open the confirmation popup
  const openConfirmationPopup = (roleId) => {
    roleToDelete.value = roleId;
    isConfirmationPopupOpen.value = true;
  };
  
  // Close the confirmation popup
  const closeConfirmationPopup = () => {
    isConfirmationPopupOpen.value = false;
    roleToDelete.value = null;
  };
  
  // Handle the Delete button click
  const handleDelete = (roleId) => {
    openConfirmationPopup(roleId);
  };
  
  // Confirm the deletion
  const confirmDelete = () => {
    if (roleToDelete.value) {
      userRoles.value = userRoles.value.filter((role) => role.id !== roleToDelete.value);
    }
    closeConfirmationPopup();
  };
  
  // Open Side Panel for Adding or Editing
  const openSidePanel = (isEdit, role = null) => {
    isEditing.value = isEdit;
    if (isEdit && role) {
      newRole.value = {
        id: role.id,
        name: role.name,
        description: role.description,
        activitiesInput: (role.activities || []).join('\n'),
        image: role.image || '',
      };
    } else {
      resetNewRoleForm();
    }
    isSidePanelOpen.value = true;
  };
  
  // Close Side Panel
  const closeSidePanel = () => {
    isSidePanelOpen.value = false;
    resetNewRoleForm();
  };
  
  // Reset New Role Form
  const resetNewRoleForm = () => {
    newRole.value = {
      id: null,
      name: '',
      description: '',
      activitiesInput: '',
      image: '',
    };
  };

  const isFormValid = computed(() => {
  return newRole.value.name.trim() !== '' && newRole.value.activitiesInput.trim() !== '';
});
  
  // Save or Update Role
  const saveRole = () => {
    console.log("hello")
    if (!newRole.value.name || !newRole.value.activitiesInput) {
      alert('Name and Activities are required fields.');
      return;
    }
  
    const activities = newRole.value.activitiesInput
      .split('\n')
      .map((activity) => activity.trim())
      .filter((activity) => activity);
  
    const roleData = {
      id: newRole.value.id || userRoles.value.length + 1,
      name: newRole.value.name,
      description: newRole.value.description || 'N/A',
      activities: activities,
      image: newRole.value.image || 'defaultImg.png',
    };
  
    if (isEditing.value) {
      const index = userRoles.value.findIndex((role) => role.id === newRole.value.id);
      if (index !== -1) {
        userRoles.value[index] = roleData;
      }
    } else {
      userRoles.value.unshift(roleData);
    }
  
    closeSidePanel();
  };
  
  // Handle Edit Action
  const handleEdit = (role) => {
    if(role.description === "N/A"){
      role.description=""
    }
    openSidePanel(true, role);
  };

  // Track focus state of the textarea
const isTextareaFocused = ref(false);

// Handle textarea focus event
const handleTextareaFocus = () => {
  isTextareaFocused.value = true;
};

// Handle textarea blur event
const handleTextareaBlur = () => {
  isTextareaFocused.value = false;
};


  // Watch for changes in activitiesInput to adjust height
watch(() => newRole.value.activitiesInput, adjustTextareaHeight);


  </script>
  <style lang="scss" scoped>
  .user-roles-body-wrapper {
    width: 100%;
    // height: 50%;
    max-width: 100%;
    padding: 0 1rem;
    // margin-top: 1.5rem;
    gap: 10px;
    overflow-y: auto;
    position: relative;
  
    .user-roles-header-wrapper {
      padding-bottom: 10px;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #ccc;
  
      .user-roles-header-buttons-wrapper {
        display: flex;
        gap: 20px;
        padding-right: 20px;
  
        .add-new-user-role-button {
          padding: 5px 10px;
          font-size: 14px;
          color: #6d78d5;
          border: 1px solid #6d78d5;
          border-radius: 5px;
          cursor: pointer;
          &:hover{
            background: #6d78d5;
            color: white;
          }
        }
  
        .continue-button {
          background: #6d78d5;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 14px;
          color: white;
          cursor: pointer;
        }
      }
    }
  
    .user-roles-section-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Responsive grid
      gap: 20px;
      margin-top: 20px;
      padding: 0px 16px 16px 16px;
  
      .cards {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
        .card-content {
          .role-image {
            width: 100%; // Image occupies full width
            height: 22vh; // Maintain aspect ratio
            object-fit: contain; // Remove extra space below the image
            padding: 12px;
          }
  
          .role-name-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
            border-bottom: 2px solid #ccc;
  
            .role-name {
              font-weight: bold;
              color: #333;
            }
  
            .three-dots-menu {
              position: relative;
              cursor: pointer;
              display: flex;
              flex-direction: column; // Stack dots vertically
              gap: 2px; // Space between dots
              .popup-menu {
                position: absolute;
                right: 0;
                top: 20px;
                padding: 8px 0px;
                background-color: white;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                z-index: 10;
  
                .popup-item {
                  padding: 8px 16px;
                  font-size: 12px;
                  display: flex;
                  gap: 5px;
                  align-items: center;
                  color: #333;
                  cursor: pointer;
                  svg{
                        height: 1.5rem;
                        width: 1.5rem;
                  }
                  &.edit{
                      svg{
                        fill: #005cbb;
                      }
                  }
                  &.delete{
                    svg{
                        fill: #ba1a1a;
                    }
                  }
                  &:hover {
                    background-color: #f0f0f0;
                  }
                }
              }
            }
          }
  
          .role-description {
            color: #666;
            font-size: 0.9em;
            padding: 16px;
          }
  
          .divider {
            border-bottom: 1px solid #ccc;
            margin: 0 16px;
          }
  
          .activities-section {
            padding: 16px;
  
            .activities-heading {
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
            }
  
            .activities-list {
              .activity-item {
                display: flex;
                gap: 8px;
                margin-bottom: 8px;
                padding: .5rem 1rem;
  
                .activity-number {
                  // font-weight: bold;
                  color: #333;
                  font-size: 12px;
                }
  
                .activity-content {
                  color: #666;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  
    /* Side Panel Styles */
    .side-panel-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      z-index: 1000;
      // border-top-left-radius: 50px;
  
      .side-panel {
        width: 400px;
        height: 100%;
        background-color: white;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        border-top-left-radius: 15px;
  
        .side-panel-header-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
        //   border-bottom: 1px solid #ccc;
  
          .side-panel-header {
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.2;
          }
  
          svg {
            height: 1.5rem;
            width: 1.5rem;
            cursor: pointer;
          }
        }
  
        .side-panel-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
  
          .form-group {
            margin-bottom: 16px;
  
            label {
              display: block;
              .required {
                color: red;
              }
            }
  
            input,
            textarea {
              width: 100%;
              padding: 4px 0px 0px 0px;
              border: none;
              border-bottom: 1px solid #ccc;
              // border-radius: 4px;
              font-size: 1rem;
              outline: none;
            }
  
            textarea {
              overflow: hidden;
              resize: none;
            }
          }
  
          .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
  
            .cancel-button {
              padding: 10px 20px;
              background-color: #f0f0f0;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 1rem;
              cursor: pointer;
  
              &:hover {
                background-color: #e0e0e0;
              }
            }
  
            .submit-button {
              padding: 10px 20px;
              background-color: #6d78d5;
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 1rem;
              cursor: pointer;
  
              &:hover {
                background-color: #5c67c5;
              }
              &:disabled {
                background-color: #ccc;
                cursor: default; 
              }
            }
          }
        }
      }
    }
  }
  .confirmation-popup-content {
  padding: 2rem 1.5rem 1rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .confirmation-row {
    // margin-bottom: 1rem;

    &.delete-text {
      font-size: 1.25rem;
      font-weight: bold;
      color: #333;
    }

    &.confirmation-message {
      font-size: 1rem;
      color: #666;

      strong {
        color: #333;
      }
    }

    &.confirmation-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;

      .cancel-button,
      .delete-button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
      }

      .cancel-button {
        background-color: #f0f0f0;
        color: #333;

        &:hover {
          background-color: #e0e0e0;
        }
      }

      .delete-button {
        background-color: #ff4d4f;
        color: white;

        &:hover {
          background-color: #ff7875;
        }
      }
    }
  }
}
  </style>

<style lang="scss">
.basic-popup-styling{
    &.popup-component-wrapper{
        // background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(0px);
        .popup-component-container{
            max-width: 20rem;
            height: 100% !important;
            width: 100% !important;
        }
    }
}
</style>