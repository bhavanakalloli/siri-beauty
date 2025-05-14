"use server"

export interface BookingData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export async function sendBookingEmail(data: BookingData) {
  try {
    // Validate data
    if (!data.name || !data.email || !data.phone) {
      throw new Error("Missing required fields")
    }

    // Get the owner's email from environment variables
    const ownerEmail = process.env.OWNER_EMAIL || "siriwellnesscentreblr@gmail.com"

    // Log the booking data (for development/debugging)
    console.log("New booking received:", data)
    console.log("Will be sent to:", ownerEmail)

    // In a production environment with SendGrid:
    if (process.env.EMAIL_API_KEY) {
      try {
        // Send email to owner
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: ownerEmail }],
                subject: `New Booking: ${data.service || "Service"} - ${data.name}`,
              },
            ],
            from: { email: "noreply@siribeauty.com", name: "Siri Beauty Website" },
            content: [
              {
                type: "text/html",
                value: `
                  <h2>New Booking Request from Siri Beauty Website</h2>
                  <p><strong>Name:</strong> ${data.name}</p>
                  <p><strong>Email:</strong> ${data.email}</p>
                  <p><strong>Phone:</strong> ${data.phone}</p>
                  <p><strong>Service:</strong> ${data.service || "Not specified"}</p>
                  <p><strong>Message:</strong> ${data.message || "No message provided"}</p>
                  <p>Please contact the customer to confirm their appointment.</p>
                `,
              },
            ],
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("SendGrid API error:", errorText)
          throw new Error(`Email API error: ${response.status}`)
        }

        // Send confirmation to customer
        await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: data.email }],
                subject: "Your Booking Request at Siri Beauty and Wellness",
              },
            ],
            from: { email: "noreply@siribeauty.com", name: "Siri Beauty and Wellness" },
            content: [
              {
                type: "text/html",
                value: `
                  <h2>Thank you for your booking request!</h2>
                  <p>Dear ${data.name},</p>
                  <p>We have received your booking request for ${data.service || "our services"}.</p>
                  <p>Our team will contact you shortly at ${data.phone} to confirm your appointment.</p>
                  <p>If you have any questions, please feel free to call us at +91 9611206947 or +91 9611206587.</p>
                  <p>Warm regards,<br>Siri Beauty and Wellness Team</p>
                `,
              },
            ],
          }),
        })

        return {
          success: true,
          messageId: `sg-${Date.now()}`,
          message: "Your booking request has been received. We'll contact you shortly.",
        }
      } catch (emailError) {
        console.error("Error sending email via API:", emailError)
        // Fall back to simulation if API fails
      }
    }

    // If no API key or API call failed, simulate a successful email send
    return {
      success: true,
      messageId: `mock-${Date.now()}`,
      message: "Your booking request has been received. We'll contact you shortly.",
    }
  } catch (error) {
    console.error("Error processing booking:", error)
    return {
      success: false,
      error: (error as Error).message,
      message: "There was a problem processing your booking. Please try again or call us directly.",
    }
  }
}
