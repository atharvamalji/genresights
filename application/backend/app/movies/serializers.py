from rest_framework import serializers

class MovieSerializer(serializers.Serializer):
    name = serializers.CharField()
    year_of_release = serializers.IntegerField()