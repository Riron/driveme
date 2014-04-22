using Microsoft.Phone.Controls;
using Microsoft.Phone.Notification;
using System;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Runtime.Serialization;
using System.Windows;

namespace WPCordovaClassLib.Cordova.Commands
{
    public class PushPlugin : BaseCommand
    {
        private HttpNotificationChannel pushChannel;
        private string channelName;
        private string toastCallback;

        public void register(string options)
        {
            Options pushOptions;

            try
            {
                string[] args = JSON.JsonHelper.Deserialize<string[]>(options);
                pushOptions = JSON.JsonHelper.Deserialize<Options>(args[0]);
                this.channelName = pushOptions.ChannelName;
                this.toastCallback = pushOptions.NotificationCallback;
            }
            catch (Exception)
            {
                DispatchCommandResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
                return;
            }

            pushChannel = HttpNotificationChannel.Find(channelName);
            if (pushChannel == null)
            {
                pushChannel = new HttpNotificationChannel(channelName);
                pushChannel.ChannelUriUpdated += new EventHandler<NotificationChannelUriEventArgs>(PushChannel_ChannelUriUpdated);
                pushChannel.ErrorOccurred += new EventHandler<NotificationChannelErrorEventArgs>(PushChannel_ErrorOccurred);
                pushChannel.ShellToastNotificationReceived += new EventHandler<NotificationEventArgs>(PushChannel_ShellToastNotificationReceived);
                pushChannel.Open();
                pushChannel.BindToShellToast();
            }
            else
            {
                pushChannel.ChannelUriUpdated += new EventHandler<NotificationChannelUriEventArgs>(PushChannel_ChannelUriUpdated);
                pushChannel.ErrorOccurred += new EventHandler<NotificationChannelErrorEventArgs>(PushChannel_ErrorOccurred);
                pushChannel.ShellToastNotificationReceived += new EventHandler<NotificationEventArgs>(PushChannel_ShellToastNotificationReceived);

                RegisterResult result = new RegisterResult();
                result.ChannelName = this.channelName;
                result.Uri = pushChannel.ChannelUri.ToString();
                this.DispatchCommandResult(new PluginResult(PluginResult.Status.OK, result));
            }
        }

        void PushChannel_ChannelUriUpdated(object sender, NotificationChannelUriEventArgs e)
        {
            // return uri to js
            RegisterResult result = new RegisterResult();
            result.ChannelName = this.channelName;
            result.Uri = pushChannel.ChannelUri.ToString();
            this.DispatchCommandResult(new PluginResult(PluginResult.Status.OK, result));
        }

        void PushChannel_ErrorOccurred(object sender, NotificationChannelErrorEventArgs e)
        {
            // call error handler and return uri
            RegisterError err = new RegisterError();
            err.Code = e.ErrorCode.ToString();
            err.Message = e.Message;
            this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, err));
        }

        void PushChannel_ShellToastNotificationReceived(object sender, NotificationEventArgs e)
        {
            StringBuilder message = new StringBuilder();
            string relativeUri = string.Empty;

            Toast toast = new Toast();
            if (e.Collection.ContainsKey("wp:Text1"))
            {
                toast.Title = e.Collection["wp:Text1"];
            }
            if (e.Collection.ContainsKey("wp:Text2"))
            {
                toast.Subtitle = e.Collection["wp:Text2"];
            }
            if (e.Collection.ContainsKey("wp:Param"))
            {
                toast.Param = e.Collection["wp:Param"];
            }

            PluginResult result = new PluginResult(PluginResult.Status.OK, toast);

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                PhoneApplicationFrame frame = Application.Current.RootVisual as PhoneApplicationFrame;
                if (frame != null)
                {
                    PhoneApplicationPage page = frame.Content as PhoneApplicationPage;
                    if (page != null)
                    {
                        CordovaView cView = page.FindName("CordovaView") as CordovaView; // was: PGView
                        if (cView != null)
                        {
                            cView.Browser.Dispatcher.BeginInvoke((ThreadStart)delegate()
                            {
                                try
                                {
                                    cView.Browser.InvokeScript("execScript", this.toastCallback + "(" + result.Message + ")");
                                }
                                catch (Exception ex)
                                {
                                    Debug.WriteLine("ERROR: Exception in InvokeScriptCallback :: " + ex.Message);
                                }

                            });
                        }
                    }
                }
            });
        }

        [DataContract]
        public class Toast
        {
            [DataMember(Name = "text1", IsRequired = false)]
            public string Title { get; set; }

            [DataMember(Name = "text2", IsRequired = false)]
            public string Subtitle { get; set; }

            [DataMember(Name = "param", IsRequired = false)]
            public string Param { get; set; }
        }

        [DataContract]
        public class Options
        {
            [DataMember(Name = "channelName", IsRequired = true)]
            public string ChannelName { get; set; }

            [DataMember(Name = "ecb", IsRequired = false)]
            public string NotificationCallback { get; set; }
        }

        [DataContract]
        public class RegisterResult
        {
            [DataMember(Name = "uri", IsRequired = true)]
            public string Uri { get; set; }

            [DataMember(Name = "channel", IsRequired = true)]
            public string ChannelName { get; set; }
        }

        [DataContract]
        public class RegisterError
        {
            [DataMember(Name = "code", IsRequired = true)]
            public string Code { get; set; }

            [DataMember(Name = "message", IsRequired = true)]
            public string Message { get; set; }
        }
    }
}