from rest_framework import serializers
from django.contrib.auth import get_user_model
from dictionary.models import Language

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile_image']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    profile_image = serializers.ImageField(required=False, allow_null=True)
    native_languages = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all(), many=True, required=False)
    languages_to_learn = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all(), many=True, required=False)


    class Meta:
        model = User
        fields =['username', 'email', 'password', 'profile_image', 'native_languages', 'languages_to_learn']

    def create(self, validated_data):
        native_languages = validated_data.pop('native_languages', [])
        languages_to_learn = validated_data.pop('languages_to_learn', [])

        user = User.objects.create_user(**validated_data)

        user.native_languages.set(native_languages)
        user.languages_to_learn.set(languages_to_learn)

        return user