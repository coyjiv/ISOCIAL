import { API_URL } from '../../api'

export const sendResetPasswordRequest = async (values, onError, onSuccess) => {
  try {
    const response = await fetch(
      `${API_URL}/auth/request-reset-password?email=${values.email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.status != 200 && !response.ok) {
      onError()
    } else {
      onSuccess()
    }
  } catch (error) {
    console.error('Password resetting error:', error.message)
  }
}

export const updatePassword = async (values, id, onError, onSuccess) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword: values.password,
      }),
    })
    if (response.status != 200 && !response.ok) {
      onError()
    } else {
      onSuccess()
    }
  } catch (error) {
    console.error('Password updating error:', error.message)
  }
}
